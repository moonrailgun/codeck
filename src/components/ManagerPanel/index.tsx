import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Collapse,
  Space,
} from '@arco-design/web-react';
import { variableTypes } from '../../utils/consts';
import { useVariableStore, VariableItem } from '../../store/variable';
import { values } from 'lodash-es';
import { useNodeStore } from '../../store/node';
import { CodeCompiler } from '@/code/compiler';
import { openRunCodeModal } from '../modal/RunCode';

const FormItem = Form.Item;

export const ManagerPanel: React.FC = React.memo(() => {
  const [showVariableCreator, setShowVariableCreator] = useState(false);
  const { variableMap, createVariable, deleteVariable } = useVariableStore();

  const variableList = values(variableMap);

  return (
    <div>
      <Space>
        <Button onClick={() => useNodeStore.getState().resetNode()}>
          Reset
        </Button>

        <Button
          type="primary"
          onClick={() => openRunCodeModal(new CodeCompiler().generate())}
        >
          Run
        </Button>
      </Space>

      <Divider />

      <Button
        long={true}
        onClick={() => setShowVariableCreator((state) => !state)}
      >
        Create Variable
      </Button>
      {showVariableCreator && (
        <div className="px-2">
          <VariableForm
            isCreate={true}
            initialValues={{ name: '', type: variableTypes[0] }}
            submitLabel="Create"
            onSubmit={(values: VariableItem) => {
              createVariable(values.name, values.type, values.defaultValue);
            }}
          />
        </div>
      )}

      <Divider />

      <div className="text-lg font-bold mb-2">
        Variables ({variableList.length})
      </div>

      <Collapse bordered={true} lazyload={true} accordion={true}>
        {variableList.map((item) => (
          <Collapse.Item key={item.name} header={item.name} name={item.name}>
            <VariableForm
              isCreate={false}
              initialValues={item}
              submitLabel="Update"
              onSubmit={(values: VariableItem) => {
                console.log('values', values);
              }}
            />

            <Button status="danger" onClick={() => deleteVariable(item.name)}>
              Delete
            </Button>
          </Collapse.Item>
        ))}
      </Collapse>
    </div>
  );
});
ManagerPanel.displayName = 'ManagerPanel';

export const VariableForm: React.FC<{
  isCreate: boolean;
  initialValues?: VariableItem;
  submitLabel: string;
  onSubmit: (values: VariableItem) => void;
}> = React.memo((props) => {
  return (
    <Form
      autoComplete="off"
      layout="vertical"
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      disabled={!props.isCreate} // 暂时不支持更新
    >
      <FormItem
        field="name"
        label="Name"
        rules={[
          { required: true },
          {
            match: /^[a-zA-Z_]/,
            message: 'Variable name must be start with _ or alphabet',
          },
        ]}
        required={true}
      >
        <Input placeholder="Place variable name" />
      </FormItem>
      <FormItem
        field="type"
        label="Type"
        rules={[{ required: true }]}
        required={true}
        disabled={!props.isCreate}
      >
        <Select>
          {variableTypes.map((v) => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem field="defaultValue" label="Default">
        <Input placeholder="Place variable default value" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          {props.submitLabel}
        </Button>
      </FormItem>
    </Form>
  );
});
VariableForm.displayName = 'VariableForm';
