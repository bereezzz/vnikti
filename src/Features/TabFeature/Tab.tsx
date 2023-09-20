import { Tabs } from '@mantine/core';
import TableUser from '../../Widgets/TableUser/TableUser';
import TableCardWidgets from '../../Widgets/TableCard/TableCardWidgets';
function Tab() {

  return (
    <Tabs color="gray" defaultValue={"tab1"}>
      <Tabs.List>

        <Tabs.Tab value="tab1" >
          Таблица людей
        </Tabs.Tab>
        <Tabs.Tab value="tab2" >
          Таблица кредитных карт
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="tab1">
        <TableUser></TableUser>
      </Tabs.Panel>

      <Tabs.Panel value="tab2">
        <TableCardWidgets></TableCardWidgets>
      </Tabs.Panel>

    </Tabs>
  );
}

export default Tab;
