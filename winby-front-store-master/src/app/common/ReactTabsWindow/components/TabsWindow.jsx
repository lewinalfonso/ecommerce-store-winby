import React from 'react'

import { Container, Tab, TabsWrapper, Wrapper } from './styled'

export const TabsWindow = ({ tabs, totalTabs, height, currentTabIndex, onTabClick }) => {

    return <Container height={height}>
        <TabsWrapper>
            {tabs?.map((tab, index) => <Tab
                key={`wb_tab_window_index_${index}`}
                active={currentTabIndex === index}
                totalTabs={totalTabs}
                visible={tab.visible}
                onClick={() => onTabClick(index)}>
                {tab?.name || 'Unnamed tab'}
            </Tab>
            )}
        </TabsWrapper>
        <Wrapper>
            {tabs[currentTabIndex]?.content}
        </Wrapper>
    </Container>
}