import React, { useRef, useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import { motion, useInView } from 'framer-motion';
import { styles } from '@storybook/components-marketing';

const { spacing, breakpoints, color } = styles;

const Figure = styled.figure`
  margin: 0;
  padding: 0 ${spacing.padding.medium}px;
`;

const Content = styled.div`
  position: relative;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 4rem;
  }
`;

const Status = styled(motion.div)`
  display: block;
  width: 24px;
  height: 24px;
  perspective: 1000px;
  transform-style: preserve-3d;
`;
const Checking = styled.img`
  transform: rotateY(0deg);
  backface-visibility: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;
const Done = styled.img`
  transform: rotateY(180deg);
  backface-visibility: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const StatusLarge = styled(Status)`
  width: 28px;
  height: 28px;
`;

const Checks = styled(motion.div)`
  border-radius: 4px;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: ${color.border};
  background: ${color.lightest};

  box-shadow: 0px 8.808px 50px 0px rgba(133, 191, 60, 0.3),
    0px 6.406px 18.417px 0px rgba(102, 191, 60, 0.1);
  border-color: ${color.green};
`;

const CheckItem = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid ${color.medium};
  }
`;
const CheckLabel = styled.div`
  font-size: 16px;
  line-height: 24px;
  flex: 1 1 auto;
  min-width: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  b {
    font-weight: 700;
  }
`;
const ChromaticLogo = styled.img`
  display: block;
  width: 22px;
  height: 22px;
`;
const CheckItemLarge = styled(CheckItem)`
  padding: 16px 18px;
`;

const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`;
const Text = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const checksVariants = {
  initial: {
    borderColor: color.border,
    boxShadow:
      '0px 8.808px 50px 0px rgba(0, 0, 0, 0.3), 0px 6.406px 18.417px 0px rgba(0, 0, 0, 0.1)',
  },
  checking: {
    borderColor: 'rgba(254, 187, 48, 1)',
    boxShadow:
      '0px 8.808px 50px 0px rgba(254, 187, 48, 0.3), 0px 6.406px 18.417px 0px rgba(254, 210, 48, 0.1)',
    transition: {
      duration: 0.4,
    },
  },
  checked: {
    borderColor: color.green,
    boxShadow:
      '0px 8.808px 50px 0px rgba(133, 191, 60, 0.3), 0px 6.406px 18.417px 0px rgba(102, 191, 60, 0.1)',
    transition: {
      duration: 0.4,
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};
const statusVariants = {
  initial: { rotateY: 0 },
  checked: { rotateY: 180 },
};
const textVariantsChecking = {
  initial: { opacity: 1 },
  checked: { opacity: 0 },
};
const textVariantsChecked = {
  initial: { opacity: 0 },
  checked: { opacity: 1 },
};

const checks = [
  {
    id: 1,
    label: 'Storybook Publish',
    checking: 'Publishing UI…',
    done: 'Ready to share!',
  },
  {
    id: 2,
    label: 'UI Tests',
    checking: 'Running tests…',
    done: '2 changes accepted as baselines',
  },
  {
    id: 3,
    label: 'UI Review',
    checking: 'Awaiting reviewers…',
    done: '3 discussions resolved',
  },
];

export function MergeAndShip({ docs, ...props }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });
  const [state, setState] = useState('initial');

  useEffect(() => {
    let id;
    if (isInView) {
      setState('checking');
      id = setTimeout(() => {
        setState('checked');
      }, 1000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [isInView]);

  return (
    <Figure {...props}>
      <Content>
        <Checks layout ref={ref} variants={checksVariants} initial="initial" animate={state}>
          <CheckItemLarge>
            <StatusLarge variants={statusVariants} transition={{ duration: 0.4, delay: 1.4 }}>
              <Checking src="images/home/automate/ci-check-yellow.svg" alt="" />
              <Done src="images/home/automate/ci-check-green.svg" alt="" />
            </StatusLarge>
            <CheckLabel>
              <b>
                <TextWrapper>
                  <Text variants={textVariantsChecked} transition={{ duration: 0.4, delay: 1.4 }}>
                    All CI checks have passed!
                  </Text>
                  <Text variants={textVariantsChecking} transition={{ duration: 0.4, delay: 1.4 }}>
                    Running CI checks on components
                  </Text>
                </TextWrapper>
              </b>
            </CheckLabel>
          </CheckItemLarge>
          {checks.map(({ id, label, checking, done }) => (
            <CheckItem key={id}>
              <Status variants={statusVariants} transition={{ duration: 0.4 }}>
                <Checking src="images/home/automate/progress.svg" alt="" />
                <Done src="images/home/automate/passed.svg" alt="" />
              </Status>
              <CheckLabel>
                <TextWrapper>
                  <Text variants={textVariantsChecked} transition={{ duration: 0.4 }}>
                    <b>{label}</b> – {done}
                  </Text>
                  <Text variants={textVariantsChecking} transition={{ duration: 0.4 }}>
                    <b>{label}</b> – {checking}
                  </Text>
                </TextWrapper>
              </CheckLabel>
              <ChromaticLogo src="images/logos/icon-chromatic.svg" alt="" />
            </CheckItem>
          ))}
        </Checks>
      </Content>
    </Figure>
  );
}
