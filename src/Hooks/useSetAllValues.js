import React from 'react';

const useSetAllValues = () => {
  const isLoggedIn = sessionStorage.getItem('isAuthenticated');

  return <div>useSetAllValues</div>;
};

export default useSetAllValues;
