import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { message, Popover } from 'antd';
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './Tree.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Aceable, Inc.' },
    position: { x: 500, y: 0 },
    type: 'input',
    style: { 
      background: '#1B3B36',
      color: 'white',
      borderRadius: '25px',
      padding: '10px 20px',
      minWidth: '200px',
      border: 'none'
    }
  },
  {
    id: '2',
    data: { label: 'Name of Segment 1' },
    position: { x: 100, y: 150 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '3',
    data: { label: 'Name of Segment 2' },
    position: { x: 400, y: 150 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '4',
    data: { label: 'Name of Segment 3' },
    position: { x: 700, y: 150 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '5',
    data: { label: 'Name of Segment 4' },
    position: { x: 1000, y: 150 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '6',
    data: { label: 'Value Stream 1' },
    position: { x: 100, y: 300 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '7',
    data: { label: 'Value Stream 1' },
    position: { x: 400, y: 300 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '8',
    data: { label: 'Value Stream 1' },
    position: { x: 700, y: 300 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
  {
    id: '9',
    data: { label: 'Value Stream 1' },
    position: { x: 1000, y: 300 },
    style: { 
      background: 'white',
      borderRadius: '8px',
      padding: '10px 20px',
      minWidth: '200px',
      border: '1px solid #ccc'
    }
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e1-5', 
    source: '1', 
    target: '5', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e2-6', 
    source: '2', 
    target: '6', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e3-7', 
    source: '3', 
    target: '7', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e4-8', 
    source: '4', 
    target: '8', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  { 
    id: 'e5-9', 
    source: '5', 
    target: '9', 
    type: 'smoothstep',
    style: { stroke: '#1B3B36', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      width: 20,
      height: 20,
      color: '#1B3B36',
    },
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
];

const NodeContextMenu = ({ node, onEdit, onAdd, onDelete }) => (
  <div className="node-context-menu">
    <button onClick={() => onEdit(node)}>
      <EditOutlined /> Edit Node
    </button>
    <button onClick={() => onAdd(node)}>
      <PlusOutlined /> Add Child
    </button>
    {node.id !== '1' && (
      <button onClick={() => onDelete(node)}>
        <DeleteOutlined /> Delete
      </button>
    )}
  </div>
);

const Tree = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const CustomNode = ({ id, data }) => {
    const handleEdit = (node) => {
      const updatedTitle = prompt('Enter new name:', node.data.label);
      if (!updatedTitle) return;
      
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, data: { ...n.data, label: updatedTitle } } : n
        )
      );
      message.success('Node updated successfully');
    };

    const handleAdd = (node) => {
      const newTitle = prompt('Enter name for new node:');
      if (!newTitle) return;
      
      const newNode = {
        id: Date.now().toString(),
        data: { label: newTitle },
        position: {
          x: node.position.x,
          y: node.position.y + 150,
        },
        style: { 
          background: 'white',
          borderRadius: '8px',
          padding: '10px 20px',
          minWidth: '200px',
          border: '1px solid #ccc'
        }
      };
      
      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `e${node.id}-${newNode.id}`,
          source: node.id,
          target: newNode.id,
          type: 'smoothstep',
          style: { stroke: '#1B3B36', strokeWidth: 2 },
          markerEnd: {
            type: 'arrowclosed',
            width: 20,
            height: 20,
            color: '#1B3B36',
          },
          sourceHandle: 'bottom',
          targetHandle: 'top',
        },
      ]);
      message.success('Node added successfully');
    };

    const handleDelete = (node) => {
      if (node.id === '1') {
        message.error('Cannot delete root node');
        return;
      }
      
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter((e) => e.source !== node.id && e.target !== node.id)
      );
      message.success('Node deleted successfully');
    };

    return (
      <Popover
        content={
          <NodeContextMenu
            node={{ id, data, position: nodes.find(n => n.id === id).position }}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        }
        trigger="click"
        placement="right"
      >
        <div className="custom-node">
          <Handle 
            type="target" 
            position="top" 
            id="top"
            style={{ background: '#555' }}
          />
          <div>{data.label}</div>
          <Handle 
            type="source" 
            position="bottom" 
            id="bottom"
            style={{ background: '#555' }}
          />
        </div>
      </Popover>
    );
  };

  const nodeTypes = {
    default: CustomNode,
    input: CustomNode,
  };

  return (
    <div style={{ width: '100%', height: '100vh', background: '#f8f8f8' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#1B3B36', strokeWidth: 2 },
        }}
        connectionMode="loose"
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#ccc" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default Tree;