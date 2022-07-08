import Button from '@/components/Button';
import styles from './paginator.module.scss';

/**
 * Render Paginator
 * @param {Object} props
 * @param {Object} props.pagination Define pagination data
 * @param {Number} props.pagination.current Define current pagination position
 * @param {Function} props.pagination.jump Define pagination jumper function
 * @param {Number[]} props.pagination.length Define pagination viewed length
 * @returns Paginator component
 */

export default function Paginator({ pagination }) {
  const { current, jump, length } = pagination;

  const _handlePageJump = (num) => () => jump(num);

  return (
    <div className={styles.root}>
      <Button
        className={styles.customButton}
        disabled={current === 1}
        onClick={_handlePageJump(current - 1)}
      >
        ◁
      </Button>
      {length.map((l, key) => {
        const isActive = l === current;

        return (
          <Button
            className={styles.customButton}
            disabled={isActive}
            onClick={_handlePageJump(l)}
            key={key}
          >
            {l}
          </Button>
        );
      })}
      <Button
        className={styles.customButton}
        onClick={_handlePageJump(current + 1)}
      >
        ▷
      </Button>
    </div>
  );
}
