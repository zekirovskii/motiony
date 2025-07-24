import PropTypes from 'prop-types';
import css from './Rating.module.css';

export default function Rating({ value, variant = 'card' }) {
  const display = value !== undefined ? Math.round(value * 10) : '–';

  const className =
    variant === 'inline' ? css.inlineRating : css.scoreBadge;

  return (
    <span className={className}>
      {display}<sup>%</sup>
    </span>
  );
}

Rating.propTypes = {
  value: PropTypes.number,
  variant: PropTypes.oneOf(['card', 'inline']),
};
