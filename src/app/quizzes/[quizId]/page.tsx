'use client';

import { Tabs } from '@chakra-ui/react';
import QuizPreview from '@components/QuizPreview';
import QuizSettings from '@components/QuizSettings';
import { TabWithTitleProps } from '@components/Tabs/Tabs';

export default function Page({ params }: { params: { quizId: string } }) {
  const { quizId } = params;

  const tabsData: TabWithTitleProps[] = [{ id: '1', title: 'Quiz Settings', component: () => <QuizSettings quizId={quizId} /> }];

  return (
    <>
      <QuizPreview quizId={quizId} />

      <div className="sidebar right-sidebar">
        <Tabs tabsData={tabsData} />
      </div>
    </>
  );
}
