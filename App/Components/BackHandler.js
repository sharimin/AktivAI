import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

const BackHandlerComponent = ({ onBack }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onBack) {
        onBack();
        return true; // Prevent default behavior (e.g., closing the app)
      }
      return false;
    });

    return () => backHandler.remove();
  }, [onBack]);

  return null;
};

export default BackHandlerComponent;
