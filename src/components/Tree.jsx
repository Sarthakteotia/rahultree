import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

const Tree = ({ treeData, onConfirm }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (treeData) {
      const newNodes = [];
      const newEdges = [];
      let nodeId = 1;

      // Root node (company name)
      newNodes.push({
        id: '1',
        data: { label: treeData.name },
        position: { x: 500, y: 0 },
        type: 'input',
        className: 'bg-[#1B3B36] text-white rounded-full px-6 py-3 min-w-[200px] text-center'
      });

      // Segments (Level 1)
      treeData.children.forEach((segment, segmentIndex) => {
        const segmentId = `segment-${nodeId++}`;
        const xPos = 100 + (segmentIndex * 300);
        
        newNodes.push({
          id: segmentId,
          data: { label: segment.name },
          position: { x: xPos, y: 150 },
          className: 'bg-white rounded-lg border border-gray-200 px-6 py-3 min-w-[200px] text-center'
        });

        newEdges.push({
          id: `e1-${segmentId}`,
          source: '1',
          target: segmentId,
          type: 'smoothstep',
          className: 'stroke-[#1B3B36] stroke-2'
        });

        // Value Streams (Level 5)
        segment.children.forEach((valueStream, streamIndex) => {
          const streamId = `stream-${nodeId++}`;
          
          newNodes.push({
            id: streamId,
            data: { label: valueStream.name },
            position: { x: xPos, y: 300 },
            className: 'bg-white rounded-lg border border-gray-200 px-6 py-3 min-w-[200px] text-center'
          });

          newEdges.push({
            id: `e${segmentId}-${streamId}`,
            source: segmentId,
            target: streamId,
            type: 'smoothstep',
            className: 'stroke-[#1B3B36] stroke-2'
          });

          // Activities (Level 7)
          valueStream.children.forEach((activity, activityIndex) => {
            const activityId = `activity-${nodeId++}`;
            
            newNodes.push({
              id: activityId,
              data: { label: activity.name },
              position: { x: xPos - 100 + (activityIndex * 200), y: 450 },
              className: 'bg-white rounded-lg border border-gray-200 px-6 py-3 min-w-[200px] text-center'
            });

            newEdges.push({
              id: `e${streamId}-${activityId}`,
              source: streamId,
              target: activityId,
              type: 'smoothstep',
              className: 'stroke-[#1B3B36] stroke-2'
            });
          });
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [treeData, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const CustomNode = ({ data }) => (
    <div>
      <Handle type="target" position="top" className="w-2 h-2 bg-gray-400" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-400" />
    </div>
  );

  const nodeTypes = {
    default: CustomNode,
    input: CustomNode,
  };

  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Value-Stream View</h2>
        {/* <p className="text-sm text-gray-600">
          Does this structure accurately represent your firm segments and value-streams?
        </p> */}
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        className="bg-gray-50"
      >
        <Background color="#ccc" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>

      <div className="absolute bottom-4 right-4 flex gap-4">
        <button 
          onClick={() => onConfirm(false)}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          No
        </button>
        <button 
          onClick={() => onConfirm(true)}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Tree;