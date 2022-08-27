import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { motion, MotionConfig, MotionValue, useTransform } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { AddonsPanel } from './AddonsPanel';
import { RangeSlider } from './RangeSlider';
import { VSCode } from './VSCode';

const Frame = styled(motion.img)`
  display: block;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const opacity = {
  defaultStory: [1, 0, 0, 1],
  noSelectionStory: [0, 1, 0, 0],
  inputRangeStory: [0, 0, 1, 0],
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 71.81889149%;
`;

interface StorybookDemoProps {
  type: 'rangeSlider' | 'timeFrame';
  isolationScrollProgress: MotionValue;
  storyIndex: MotionValue;
}

export const StorybookDemo = ({
  type = 'rangeSlider',
  isolationScrollProgress,
  storyIndex,
  ...props
}: StorybookDemoProps) => {
  const [activeStory, setActiveStory] = useState('default');

  useEffect(() => {
    function updateId() {
      setActiveStory(['default', 'no-selection', 'input-range', 'default'][storyIndex.get()]);
    }

    const unsubscribe = storyIndex.onChange(updateId);

    return () => {
      unsubscribe();
    };
  }, []);

  const width = useTransform(isolationScrollProgress, [0, 1], ['100%', '157%']);
  const scale = useTransform(isolationScrollProgress, [0, 1], [1, 1.5]);
  // const x = useTransform(isolationScrollProgress, [0, 1], ['0%', '-3.2%']);
  // const y = useTransform(isolationScrollProgress, [0, 1], ['0%', '-6.15%']);
  const x = useTransform(isolationScrollProgress, [0, 1], ['0%', '35.3%']);
  const y = useTransform(isolationScrollProgress, [0, 1], ['0%', '41%']);

  return (
    <Wrapper {...props}>
      <Frame
        src="images/develop/storybook-frame.svg"
        layout
        style={{ scale, x, y }}
        transition={{ delay: 0.4 }}
      />
      <Sidebar
        type={type}
        activeStory={activeStory}
        layout
        style={{ scale, x, y }}
        transition={{ delay: 0.4 }}
      />
      {/* <AddonsPanel /> */}
      <MotionConfig transition={{ duration: 1 }}>
        <RangeSlider activeStory={activeStory} />
        <VSCode scrollProgress={isolationScrollProgress} />
      </MotionConfig>
    </Wrapper>
  );
};
