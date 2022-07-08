import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { format, parseISO } from 'date-fns';
import capitalize from 'lodash/capitalize';
import orderBy from 'lodash/orderBy';

const RANDOM_USER_API =
  'https://randomuser.me/api/?inc=login,name,email,gender,registered';
const RANDOM_USER_SEED = 'ajaib_test_case';
const FILTERS_ORDER = ['gender', 'search', 'sort'];
export const RANDOM_USER_MIN_PER_FETCH = 10;
export const RANDOM_USER_MAX_PER_FETCH = 100;

/**
 * @typedef {Object} APIPayload API payload structure
 * @property {Object[]} APIPayload.data API results
 * @property {Object} APIPayload.pagination API pagination infos
 * @property {Number} APIPayload.pagination.current API pagination current page
 * @property {Function} APIPayload.pagination.jump API pagination jump function
 * @property {Number[]} APIPayload.pagination.length API pagination length
 * @property {'success' | 'loading' | 'error'} APIPayload.status API status
 */

/**
 * Hook for Random User API call
 * @param {Object} props
 * @param {Number} props.count Define page count per page
 * @param {Object} [props.filters] Define API's filter for one page call
 * @param {'Male' | 'Female'} [props.filters.gender] Define gender category
 * @param {String} [props.filters.search] Define keyword to search
 * @param {[String, 'asc' | 'desc']} [props.filters.sort] Define sort condition
 * @returns {APIPayload} Random User API call result with provided condition(s)
 */

export default function useRandomUser(props) {
  const { count, filters } = props;

  const [status, setStatus] = useState('loading');
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const originalResult = useRef([]);
  const oldValue = useRef({ count: 1, page: 0 });

  const _defineURL = (page, count) => {
    let url = RANDOM_USER_API;

    if (page) {
      url += `&page=${page}&results=${count}&seed=${RANDOM_USER_SEED}`;
    }

    return url;
  };

  const _defineLength = (page) => {
    let current = page / 10;
    let result = [];
    let start = 1;

    current = Math.ceil(current);
    current = current * 10;
    start = current === 10 ? 1 : current - 10;

    for (let i = start; i <= current; i++) {
      result.push(i);
    }

    return result;
  };

  const _handlePageChanges = (page) => setPage(page > 0 ? page : 1);

  const _handleNewData = (datas) => {
    let processedDatas = [];

    for (var i = 0; i < datas.length; i++) {
      const { email, gender, login, name, registered } = datas[i];

      processedDatas.push({
        email,
        gender: capitalize(gender),
        username: login.username,
        name: name.first + ' ' + name.last,
        date: registered.date,
      });
    }

    return processedDatas;
  };

  const _calcFilter = (name, value, current) => {
    if (!value) return current;

    switch (name) {
      case FILTERS_ORDER[0]:
        return current.filter((curr) => curr.gender === value);
      case FILTERS_ORDER[1]:
        return current.filter((curr) =>
          Object.values(curr).some((v, key, arr) => {
            if (arr.length - 1 === key) {
              return format(parseISO(v), 'dd-MM-yyyy HH:mm')
                .toLowerCase()
                .includes(value.toLowerCase());
            }
            return v.toLowerCase().includes(value.toLowerCase());
          })
        );
      case FILTERS_ORDER[2]:
        return orderBy(current, [value[0]], [value[1]]);
      default:
        return current;
    }
  };

  const _handleFilter = (filters = {}, originalResult) => {
    if (originalResult.length === 0) return [];

    let filtersName = Object.keys(filters);
    filtersName = FILTERS_ORDER.reduce((acc, curr) => {
      if (FILTERS_ORDER.includes(curr)) acc.push(curr);

      return acc;
    }, []);
    let filteredResult = originalResult.slice();

    filtersName.map((name) => {
      filteredResult = _calcFilter(name, filters[name], filteredResult);
      return;
    });

    filteredResult = filteredResult.map((c) => ({
      ...c,
      date: format(parseISO(c.date), 'dd-MM-yyyy HH:mm'),
    }));

    return filteredResult;
  };

  useEffect(() => {
    setStatus('loading');

    const diff = oldValue.current;

    if (page === diff.page && count === diff.count) {
      // setTimeout(() => {
      setResult(_handleFilter(filters, originalResult.current));
      setStatus('success');
      // }, 0);
      return;
    }

    fetch(_defineURL(page, count))
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error happen when fetch random data from API');
        }

        return res.json();
      })
      .then((data) => {
        const processedData = _handleNewData(data.results);

        diff.page = page;
        diff.count = count;

        setResult(_handleFilter(filters, processedData));
        originalResult.current = processedData;
        setStatus('success');
      })
      .catch((err) => {
        diff.page = page;
        diff.count = count;

        setResult(err?.message || 'Error on fetch');
        setStatus('error');
      });
  }, [page, count, filters]);

  return {
    data: result,
    pagination: {
      current: page,
      jump: _handlePageChanges,
      length: _defineLength(page),
    },
    status,
  };
}
