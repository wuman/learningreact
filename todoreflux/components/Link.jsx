import React, { PropTypes } from 'react';

const Link = ({ active, children, onTodoClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={e => { e.preventDefault(); onTodoClick(); }}>{children}</a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default Link;
