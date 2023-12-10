import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

export function StepperWithContent({ addCourse, addModule }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="flex flex-col items-center w-full px-10 py-4">
      <Stepper
        activeStep={activeStep}
        activeLineClassName="bg-costumeBlue"
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className="w-[50%]"
      >
        <Step
          activeClassName="bg-costumeBlue"
          completedClassName="bg-costumeBlue"
          onClick={() => setActiveStep(0)}
        >
          1
        </Step>
        <Step
          activeClassName="bg-costumeBlue"
          completedClassName="bg-costumeBlue"
          onClick={() => setActiveStep(1)}
        >
          2
        </Step>
      </Stepper>
      <div className="w-full">{activeStep == 0 ? addCourse : addModule}</div>

      <div className="mt-12 w-[90%] flex justify-between">
        <Button
          className="bg-costumeBlue"
          onClick={handlePrev}
          disabled={isFirstStep}
        >
          Prev
        </Button>
        <Button
          className="bg-costumeBlue"
          onClick={handleNext}
          disabled={isLastStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
