import React from 'react';



const StepProgressBar: React.FC<{ totalSteps: number; currentStep: number }> = ({
  totalSteps,
  currentStep,
}) => {
  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  return (
    <ProgressBar
      percent={calculateProgress()}
      filledBackground="linear-gradient(to right, #FFCC00, #FF9900)"
    >
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            1
          </div>
        )}
      </Step>
      {/* Show the steps you want */}
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            ...
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            {Math.min(currentStep - 2, totalSteps - 1)}
          </div>
        )}
      </Step>
      {/* Show the current step */}
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            {currentStep}
          </div>
        )}
      </Step>
      {/* Show the steps you want */}
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            ...
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div
            style={{
              fontSize: '12px',
              color: accomplished ? '#ffffff' : '#999999',
            }}
          >
            {totalSteps}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default StepProgressBar;
