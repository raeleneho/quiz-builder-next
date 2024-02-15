'use client';

import { useEffect, useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import StepPreview from '../../components/StepPreview/StepPreview';
import { StepEditorProvider } from './StepEditorContext';

import { Box, Text, Flex } from '@chakra-ui/react';

import NewBlockPopoverModal from '../../components/NewBlockPopoverModal';

import StepSettings from '../StepSettings';
import { BlockSettings } from '../blocks/BlockSettings';
import Tabs, { TabWithTitleProps } from '../Tabs/Tabs';
import { TabsProvider } from '../Tabs/TabsContext';
import ResponsePreview from '../ResponsePreview';
import { LocalResponseProvider } from '../ResponseContext';

function StepEditor() {
  const {
    quizId,
    stepId,
  }: {
    quizId: string;
    stepId: string;
  } = useParams();

  const tabsData: TabWithTitleProps[] = [
    {
      id: '1',
      title: 'Step Settings',
      component: () => <StepSettings stepId={stepId} quizId={quizId} />,
    },
    {
      id: '2',
      title: 'Block Settings',
      component: () => <BlockSettings stepId={stepId} />,
    },
    { id: '3', title: 'Response Preview', component: () => <ResponsePreview /> },
  ];

  // if (!step) {
  //   return <></>;
  // }

  return (
    <>
      <LocalResponseProvider>
        <StepEditorProvider stepId={stepId}>
          <TabsProvider>
            <Box w="100%" p={6}>
              <Flex mb={2}>
                <NewBlockPopoverModal stepId={stepId} quizId={quizId} btnText="New Block" />
              </Flex>
              <Text as="b" color="white" fontSize="3xl">
                {' '}
                Welcome to Form Mason
              </Text>
              <Text color="white"> Form mason lets you build multi-step, flexible and custom forms.</Text>
              <Text color="white">Here are some example blocks that you might want to use: </Text>
              <StepPreview editable stepId={stepId} quizId={quizId ?? ''} />
            </Box>

            <div className="sidebar right-sidebar">
              <Tabs noTabsProvider tabsData={tabsData} />
            </div>
          </TabsProvider>
        </StepEditorProvider>
      </LocalResponseProvider>
    </>
  );
}

export default StepEditor;
