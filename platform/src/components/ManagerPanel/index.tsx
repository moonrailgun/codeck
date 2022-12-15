import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Divider,
  Collapse,
  Space,
  Dropdown,
  Menu,
  Radio,
} from '@arco-design/web-react';
import {
  IconGithub,
  IconPlayArrow,
  IconSave,
  IconFolder,
} from '@arco-design/web-react/icon';
import { values } from 'lodash-es';
import {
  variableTypes,
  CodeCompiler,
  useNodeStore,
  useVariableStore,
  VariableItem,
} from 'codeck';
import { openRunCodeModal } from '../modal/RunCode';
import { usePersist } from './persist';
import { usePack } from './pack';
import { useMemoizedFn } from 'ahooks';

const FormItem = Form.Item;

export const ManagerPanel: React.FC = React.memo(() => {
  const [showVariableCreator, setShowVariableCreator] = useState(false);
  const [showBuildConfig, setShowBuildConfig] = useState(false);
  const { variableMap, createVariable, deleteVariable } = useVariableStore();

  const variableList = values(variableMap);

  const {
    open: handleOpen,
    save: handleSave,
    saveAs: handleSaveAs,
    currentFileName,
  } = usePersist();

  const handleRun = useMemoizedFn(() => {
    const compiler = new CodeCompiler();
    compiler.useSkypack = true;
    openRunCodeModal(compiler.generate());
  });

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <Space direction="vertical">
          <Space>
            <Button icon={<IconFolder />} onClick={handleOpen}>
              Open
            </Button>

            <Dropdown.Button
              type="primary"
              droplist={
                <Menu>
                  <Menu.Item key="1" onClick={handleSaveAs}>
                    Save As
                  </Menu.Item>
                </Menu>
              }
              buttonProps={{
                icon: <IconSave />,
              }}
              onClick={handleSave}
            >
              Save
            </Dropdown.Button>
          </Space>

          <div>Current: {currentFileName || 'Local Storage'}</div>

          <Space>
            <Button onClick={() => useNodeStore.getState().resetNode()}>
              Reset
            </Button>

            <Button type="primary" icon={<IconPlayArrow />} onClick={handleRun}>
              Run
            </Button>
          </Space>
        </Space>
        <Divider />

        <Button
          long={true}
          onClick={() => setShowBuildConfig((state) => !state)}
        >
          Build
        </Button>

        {showBuildConfig && <BuildConfig />}

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

      <div className="text-right">
        <Button
          icon={<IconGithub />}
          onClick={() => window.open('https://github.com/moonrailgun/codeck')}
        />
      </div>
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

export const BuildConfig: React.FC = React.memo(() => {
  const [platform, setPlatform] = useState<'web' | 'nodejs'>('web');
  const [moduleType, setModuleType] = useState<'commonjs' | 'esmodule'>(
    'esmodule'
  );
  const { pack: handlePack } = usePack({
    platform,
    moduleType,
  });

  return (
    <div className="space-y-1 p-2">
      <div>
        <Radio.Group
          type="button"
          value={platform}
          onChange={(val) => setPlatform(val)}
        >
          <Radio value="web">Web</Radio>
          <Radio value="nodejs">Nodejs</Radio>
        </Radio.Group>
      </div>

      <div>
        <Radio.Group
          type="button"
          value={moduleType}
          onChange={(val) => setModuleType(val)}
        >
          <Radio value="esmodule">ESModule</Radio>
          <Radio value="commonjs">CommonJS</Radio>
        </Radio.Group>
      </div>

      <div className="text-right">
        <Button onClick={handlePack}>Pack</Button>
      </div>
    </div>
  );
});
BuildConfig.displayName = 'BuildConfig';
