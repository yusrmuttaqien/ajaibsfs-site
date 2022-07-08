import { useState, useMemo } from 'react';
import Field from '@/components/Field';
import SelectField from '@/components/SelectField';
import Paginator from '@/components/Paginator';
import Button from '@/components/Button';
import RenderIF from '@/utils/renderer/RenderIf';
import useRandomUser, {
  RANDOM_USER_MAX_PER_FETCH,
  RANDOM_USER_MIN_PER_FETCH,
} from '@/utils/hooks/useRandomUser';
import styles from './home.module.scss';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export default function Home() {
  const [gender, setGender] = useState(null);
  const [sort, setSort] = useState(null);
  const [count, setCount] = useState(RANDOM_USER_MIN_PER_FETCH);
  const [search, setSearch] = useState(null);
  const filters = useMemo(
    () => ({ gender: gender?.value, sort, search }),
    [gender, sort, search]
  );
  const { data, status, pagination } = useRandomUser({ count, filters });

  const _handleSort = (mode) => () => {
    setSort((prev) => {
      if (!prev || prev[0] !== mode) return [mode, 'desc'];

      return [mode, prev[1] === 'desc' ? 'asc' : 'desc'];
    });
  };

  const _handleResetFilter = () => {
    setGender(null);
    setSort(null);
    setCount(RANDOM_USER_MIN_PER_FETCH);
    setSearch('');
  };

  const _handleGoToRepo = () =>
    window.open(
      'https://github.com/yusrmuttaqien/ajaib-SFS-app',
      '_blank',
      'noopener,noreferrer'
    );

  const _handleYDHM = () =>
    window.open(
      'https://yusrilmuttaqien.vercel.app/',
      '_blank',
      'noopener,noreferrer'
    );

  const _handleCount = (value) => {
    if (value < RANDOM_USER_MIN_PER_FETCH) {
      setCount(RANDOM_USER_MIN_PER_FETCH);
      return;
    } else if (value > RANDOM_USER_MAX_PER_FETCH) {
      setCount(RANDOM_USER_MAX_PER_FETCH);
      return;
    }

    setCount(value);
    return;
  };

  const _defInd = (mode) => {
    if (!sort) return {};

    if (sort[0] === mode) {
      return { 'data-active': true, 'data-order': sort[1] };
    }

    return {};
  };

  return (
    <section className={styles.root}>
      <img
        src="/svgs/yusrmuttaqien.svg"
        alt="Yusril Muttaqien"
        onClick={_handleYDHM}
      />
      <h1>Ajaib Test Case - Search, filter, and sort.</h1>
      <div>
        <header>
          <div>
            <Field
              name="search"
              onChange={setSearch}
              label="Search at current page"
              placeholder="Enter a keyword"
              value={search}
            />
            <SelectField
              name="gender"
              label="Filter by gender at current page"
              placeholder="All"
              onChange={setGender}
              options={GENDER_OPTIONS}
              value={gender}
            />
            <Field
              name="row"
              onChange={_handleCount}
              label={`Row per page (${RANDOM_USER_MIN_PER_FETCH} - ${RANDOM_USER_MAX_PER_FETCH})`}
              type="number"
              min={RANDOM_USER_MIN_PER_FETCH}
              max={RANDOM_USER_MAX_PER_FETCH}
              initialValue={RANDOM_USER_MIN_PER_FETCH}
              value={count}
            />
            <Button
              className={styles.customButton}
              onClick={_handleResetFilter}
            >
              Reset filter
            </Button>
            <Button className={styles.customButton} onClick={_handleGoToRepo}>
              Go to Github repo
            </Button>
          </div>
          <Paginator pagination={pagination} />
        </header>
        <div>
          <RenderIF
            render={_renderTable(data, _defInd, _handleSort)}
            when={data.length !== 0 && status === 'success'}
          />
          <RenderIF
            render={<p>No data matches filter(s)</p>}
            when={data.length === 0 && status === 'success'}
          />
          <RenderIF render={<p>Loading...</p>} when={status === 'loading'} />
          <RenderIF
            render={<p>Error has occured.</p>}
            when={status === 'error'}
          />
        </div>
      </div>
    </section>
  );
}

function _renderTable(data, _defInd, _handleSort) {
  return (
    <table>
      <thead>
        <tr>
          <th {..._defInd('username')} onClick={_handleSort('username')}>
            Username
          </th>
          <th {..._defInd('name')} onClick={_handleSort('name')}>
            Name
          </th>
          <th {..._defInd('email')} onClick={_handleSort('email')}>
            Email
          </th>
          <th {..._defInd('gender')} onClick={_handleSort('gender')}>
            Gender
          </th>
          <th {..._defInd('date')} onClick={_handleSort('date')}>
            Registered Date
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ gender, email, name, date, username }, key) => (
          <tr key={key}>
            <td>{username}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
