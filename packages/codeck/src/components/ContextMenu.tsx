import { entries, groupBy, keys, values } from 'lodash-es';
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNodeStore } from '../store/node';
import { Trigger, Menu, Input, Message, Tree } from '@arco-design/web-react';
import { useMemoizedFn } from 'ahooks';
import Highlighter from 'react-highlight-words';
import Fuse from 'fuse.js';
import { useStageStore } from '../store/stage';
import Konva from 'konva';
import { useConnectionStore } from '../store/connection';
import { useVariableStore } from '../store/variable';
import { VarGetNodeDefinition } from '../nodes/definitions/varget';
import { VarSetNodeDefinition } from '../nodes/definitions/varset';

const ContextMenu: React.FC<{ onClose: () => void }> = React.memo((props) => {
  const { nodeDefinition, createNode } = useNodeStore();
  const [searchValue, setSearchValue] = useState('');
  const { getRelativePointerPosition } = useStageStore();
  const { variableMap } = useVariableStore();
  const nodeCreatedPosRef = useRef<Konva.Vector2d | null>(null);

  useEffect(() => {
    nodeCreatedPosRef.current = getRelativePointerPosition();
  }, []);

  const handleCreateNode = useMemoizedFn(
    (nodeName: string, data?: Record<string, any>) => {
      if (!nodeName) {
        Message.error('Node Name undefined');
        return;
      }

      if (!nodeCreatedPosRef.current) {
        Message.error('Cannot get pointer position');
        return;
      }

      createNode(nodeName, nodeCreatedPosRef.current, data);
      props.onClose();
    }
  );

  const list = useMemo(
    () => values(nodeDefinition).filter((definiton) => !definiton.hidden),
    [nodeDefinition]
  );

  const variableList = useMemo(() => keys(variableMap), [variableMap]);

  const fuse = useMemo(
    () =>
      new Fuse(list, {
        keys: ['label'],
      }),
    [list]
  );

  const variableFuse = useMemo(() => new Fuse(variableList), [variableList]);

  const matchedNode =
    searchValue === '' ? list : fuse.search(searchValue).map((res) => res.item);

  const matchedVariable =
    searchValue === ''
      ? variableList
      : variableFuse.search(searchValue).map((res) => res.item);

  return (
    <div
      className="bg-black bg-opacity-80"
      style={{
        width: 240,
      }}
    >
      <Menu>
        <Input
          autoFocus
          placeholder="Search Node"
          value={searchValue}
          onChange={setSearchValue}
          onKeyDown={(e) => e.stopPropagation()}
        />

        <div className="overflow-auto" style={{ maxHeight: 400 }}>
          <Tree size="mini" className="h-full" blockNode={true}>
            {Array.isArray(matchedVariable) && matchedVariable.length > 0 && (
              <Tree.Node title="Variable">
                {matchedVariable.map((item) => (
                  <Tree.Node
                    key={`var-${item}`}
                    title={
                      <Highlighter
                        searchWords={searchValue.split('')}
                        textToHighlight={item}
                      />
                    }
                  >
                    <Tree.Node
                      key={`var-${item}-get`}
                      title={
                        <div
                          onClick={() =>
                            handleCreateNode(VarGetNodeDefinition.name, {
                              name: item,
                            })
                          }
                        >
                          Get
                        </div>
                      }
                    />
                    <Tree.Node
                      key={`var-${item}-set`}
                      title={
                        <div
                          onClick={() =>
                            handleCreateNode(VarSetNodeDefinition.name, {
                              name: item,
                            })
                          }
                        >
                          Set
                        </div>
                      }
                    />
                  </Tree.Node>
                ))}
              </Tree.Node>
            )}

            {Array.isArray(matchedNode) &&
              matchedNode.length > 0 &&
              entries(groupBy(matchedNode, 'category')).map(
                ([category, items]) => (
                  <Tree.Node key={category} title={category}>
                    {items.map((item) => (
                      <Tree.Node
                        key={`${category}-${item.name}`}
                        title={
                          <div onClick={() => handleCreateNode(item.name)}>
                            <Highlighter
                              searchWords={searchValue.split('')}
                              textToHighlight={item.label}
                            />
                          </div>
                        }
                      />
                    ))}
                  </Tree.Node>
                )
              )}
          </Tree>
        </div>
      </Menu>
    </div>
  );
});
ContextMenu.displayName = 'ContextMenu';

interface ContextMenuWrapperProps extends PropsWithChildren {
  className?: string;
}
export const ContextMenuWrapper = React.forwardRef<
  HTMLDivElement,
  ContextMenuWrapperProps
>((props, ref) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const workingConnection = useConnectionStore(
    (state) => state.workingConnection
  );

  return (
    <Trigger
      popup={() => <ContextMenu onClose={() => setPopupVisible(false)} />}
      alignPoint={true}
      escToClose={true}
      popupVisible={popupVisible}
      onVisibleChange={(v) => setPopupVisible(v)}
      position="bl"
      popupAlign={{
        bottom: 8,
        left: 8,
      }}
      trigger={['contextMenu']}
      disabled={!!workingConnection}
    >
      <div className={props.className} ref={ref}>
        {props.children}
      </div>
    </Trigger>
  );
});
ContextMenuWrapper.displayName = 'ContextMenuWrapper';
