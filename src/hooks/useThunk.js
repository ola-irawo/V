import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useThunk = (actionCreator) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(actionCreator());
        setResult(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actionCreator]);

  return { loading, error, result };
};

export default useThunk;
