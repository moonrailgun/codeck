import React from 'react';
import { TaichuNodeComponentProps } from '../../../store/node';
import { BaseNode } from './BaseNode';

export const BeginNode: React.FC<TaichuNodeComponentProps> = React.memo(
  (props) => {
    return <BaseNode id={props.id} title="Begin" />;
  }
);
BeginNode.displayName = 'BeginNode';
