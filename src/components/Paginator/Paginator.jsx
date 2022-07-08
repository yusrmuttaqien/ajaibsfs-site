import Button from '@/components/Button';
import styles from './paginator.module.scss';

/**
 * Render Paginator
 * @param {Object} props
 * @param {Object} props.pagination Define pagination data
 * @param {Number} props.pagination.current Define current pagination position
 * @param {Function} props.pagination.jump Define pagination jumper function
 * @param {Number[]} props.pagination.length Define pagination viewed length
 * @param {Number} props.pagination.left Define pagination jump whole back parameter
 * @param {Number} props.pagination.right Define pagination jump whole next parameter
 * @returns Paginator component
 */

export default function Paginator({ pagination }) {
  const { current, jump, length, left, right } = pagination;

  const _handlePageJump = (num) => () => jump(num);

  return (
    <div className={styles.root}>
      <Button
        className={styles.customButton}
        disabled={current <= 10}
        onClick={_handlePageJump(left)}
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
            title={l}
          >
            {l}
          </Button>
        );
      })}
      <Button className={styles.customButton} onClick={_handlePageJump(right)}>
        ▷
      </Button>
    </div>
  );
}
