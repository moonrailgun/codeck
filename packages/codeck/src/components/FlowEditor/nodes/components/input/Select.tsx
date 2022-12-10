import React, { useState } from 'react';
import { Html } from 'react-konva-utils';
import { NodeInputBase, NodeInputProps } from './Base';
import { Select } from '@arco-design/web-react';
import styled from 'styled-components';

const SuperMiniSelect = styled(Select)({
  height: 16,
  display: 'block',

  '.arco-select-view': {
    height: '16px !important',
    lineHeight: '14px !important',
  },
});

const optionStyle: React.CSSProperties = {
  height: 16,
  lineHeight: '14px',
  fontSize: 10,
};

export interface NodeInputSelectProps extends NodeInputProps {
  options: { label: string; value: number | string }[];
}
export const NodeInputSelect: React.FC<NodeInputSelectProps> = React.memo(
  (props) => {
    const { options, ...others } = props;
    const [popupVisible, setPopupVisible] = useState(false);

    return (
      <NodeInputBase
        {...others}
        renderEditor={({ width, height, value, setValue, handleBlur }) => (
          <Html>
            <SuperMiniSelect
              ref={() => {
                setPopupVisible(true);
              }}
              style={{
                width,
                height,
              }}
              size="mini"
              popupVisible={popupVisible}
              onVisibleChange={setPopupVisible}
              placeholder={value}
              value={value}
              onChange={(value) => setValue(value)}
              onBlur={handleBlur}
            >
              {options.map((opt, i) => (
                <Select.Option
                  key={`${i}-${opt.value}`}
                  value={opt.value}
                  style={optionStyle}
                >
                  {opt.label}
                </Select.Option>
              ))}
            </SuperMiniSelect>
          </Html>
        )}
      />
    );
  }
);
NodeInputSelect.displayName = 'NodeInputSelect';
