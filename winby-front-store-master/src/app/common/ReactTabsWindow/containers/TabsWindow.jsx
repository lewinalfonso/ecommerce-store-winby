import React, { useState, useEffect } from 'react'

import { TabsWindowComponent } from '../components'

export const TabsWindow = ({ tabs = [], height }) => {
    const [tabsWindow, setTabsWindow] = useState([])
    const [totalTabs, setTotalTabs] = useState(3)
    const [currentTab, setCurrentTab] = useState(0)

    useEffect(() => {
        setTabsWindow(tabs)
        setTotalTabs(tabs.length)
    }, [tabs])

    return <TabsWindowComponent
        tabs={tabs}
        tabsWindow={tabsWindow}
        totalTabs={totalTabs}
        height={height}
        currentTabIndex={currentTab}
        onTabClick={index => index !== currentTab && setCurrentTab(index)}/>
}