import React, { useEffect, useState } from "react";
import axios from 'axios';
import { message } from 'antd';
import Tree from "../Tree";

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionInputs, setQuestionInputs] = useState({});
  const [newItemTitle, setNewItemTitle] = useState("");
  const maxItems = 8;
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions/getAllquestions");
        if (response.data.success) {
          const sortedQuestions = response.data.data.sort((a, b) => a.level - b.level);
          setQuestions(sortedQuestions);

          const inputs = {};
          sortedQuestions.forEach((question) => {
            inputs[question.level] = question.fields.map(field => ({
              id: field.id,
              title: field.label,
              value: field.label,
              fixed: true,
              ...(question.level === 5 && { products: [] }),
              ...(question.level === 6 && { departments: [] }),
              ...(question.level === 7 && { 
                isExpanded: false,
                subActivities: []
              }),
            }));
          });
          setQuestionInputs(inputs);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestionData = questions[currentQuestion] || {};
  const currentQuestionNumber = currentQuestionData.level || 1;
  const currentInputs = questionInputs[currentQuestionNumber] || [];

  const renderQuestionContent = () => {
    if (!currentQuestionData) return null;

    switch (currentQuestionData.level) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  {input.fixed ? (
                    <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                      {input.title}
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                      />
                      <button 
                        onClick={() => handleRemoveItem(idx)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="relative w-[200px]">
                <input
                  type="text"
                  placeholder="Enter Segment Title"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                onClick={handleAddNewItem}
                className="border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
              >
                Add New Segment
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  {input.fixed ? (
                    <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                      {input.title}
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                        placeholder="Enter activity name"
                      />
                      <button 
                        onClick={() => handleRemoveItem(idx)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="relative w-[200px]">
                <input
                  type="text"
                  placeholder="Enter Activity Title"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                onClick={handleAddNewItem}
                disabled={currentInputs.length >= maxItems}
                className={`border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm
                  ${currentInputs.length >= maxItems ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Add New Activity
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  {input.fixed ? (
                    <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                      {input.title}
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={input.value}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                        placeholder="Enter function name"
                      />
                      <button 
                        onClick={() => handleRemoveItem(idx)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="relative w-[200px]">
                <input
                  type="text"
                  placeholder="Enter Function Title"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                onClick={handleAddNewItem}
                disabled={currentInputs.length >= maxItems}
                className={`border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm
                  ${currentInputs.length >= maxItems ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Add New Function
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(33.33%-16px)] min-w-[250px]">
                  <div className="flex flex-col gap-2">
                    {input.fixed ? (
                      <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 font-medium">
                        {input.title}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          value={input.value}
                          onChange={(e) => handleInputChange(idx, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                          placeholder="Enter sub-activity name"
                        />
                        <button 
                          onClick={() => handleRemoveItem(idx)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 items-center mt-4">
              <div className="relative w-[250px]">
                <input
                  type="text"
                  placeholder="Enter Sub-activity Title"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                onClick={handleAddNewItem}
                disabled={currentInputs.length >= maxItems}
                className={`border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm
                  ${currentInputs.length >= maxItems ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Add New Sub-activity
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            {currentInputs.map((input, idx) => (
              <div key={input.id} className="flex items-center gap-4">
                <div className="w-[200px]">
                  <div className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm">
                    {`Value-Stream ${idx + 1}`}
                  </div>
                </div>

                <div className="flex-1 relative">
                  <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500 appearance-none"
                    value={input.selectedProduct || ''}
                    onChange={(e) => handleProductSelect(idx, e.target.value)}
                  >
                    <option value="">Select Product</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={handleAddNewItem}
              disabled={currentInputs.length >= maxItems}
              className={`w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm
                ${currentInputs.length >= maxItems ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Add New Value-Stream
            </button>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-6">
            {currentInputs.map((function_item) => (
              <div key={function_item.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1e2b3b]"></div>
                  <div className="relative w-[200px]">
                    {function_item.fixed ? (
                      <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                        {function_item.title}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          value={function_item.value}
                          onChange={(e) => handleFunctionChange(function_item.id, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                        />
                        <button 
                          onClick={() => handleRemoveFunction(function_item.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-6 pl-4 border-l-2 border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    {function_item.departments.map((dept) => (
                      <div key={dept.id} className="relative w-[200px]">
                        {dept.fixed ? (
                          <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                            {dept.title}
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="text"
                              value={dept.value}
                              onChange={(e) => handleDepartmentChange(function_item.id, dept.id, e.target.value)}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                            />
                            <button 
                              onClick={() => handleRemoveDepartment(function_item.id, dept.id)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {!function_item.fixed && (
                      <button
                        onClick={() => handleAddNewDepartment(function_item.id)}
                        className="w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
                      >
                        Add New Department
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col gap-4">
            {currentInputs.map((stream) => (
              <div key={stream.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    className="w-4 h-4 rounded-full bg-[#1e2b3b] flex items-center justify-center text-white text-xs"
                    onClick={() => stream.fixed && toggleStreamExpansion(stream.id)}
                  >
                    {stream.isExpanded ? "-" : "+"}
                  </button>
                  <div className="relative w-[200px]">
                    {stream.fixed ? (
                      <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                        {stream.title}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          value={stream.value}
                          onChange={(e) => handleStreamChange(stream.id, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                        />
                        <button 
                          onClick={() => handleRemoveStream(stream.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {stream.isExpanded && (
                  <div className="ml-6 pl-4 border-l-2 border-gray-200">
                    <div className="flex flex-wrap gap-4">
                      {stream.subActivities.map((activity) => (
                        <div key={activity.id} className="relative w-[300px]">
                          {activity.fixed ? (
                            <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                              {activity.title}
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="text"
                                value={activity.value}
                                onChange={(e) => handleSubActivityChange(stream.id, activity.id, e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                              />
                              <button 
                                onClick={() => handleRemoveSubActivity(stream.id, activity.id)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {!stream.fixed && (
                        <button
                          onClick={() => handleAddNewSubActivity(stream.id)}
                          className="w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
                        >
                          Add New Sub-Activity
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const generateTreePayload = () => {
    // Get level 1 (segments), level 5 (value streams), and level 7 (sub-activities) data
    const segments = questionInputs[1] || [];
    const valueStreams = questionInputs[5] || [];
    const subActivities = questionInputs[7] || [];

    // Find the level 1 question ID from the questions array
    const level1Question = questions.find(q => q.level === 1);
    
    // Build the tree structure
    const payload = {
      type: "Value-Stream",
      questionId: level1Question?._id,
      name: level1Question?.title || "Primary Operating Segments",
      children: segments.map(segment => ({
        name: segment.value,
        children: valueStreams.map(valueStream => ({
          name: valueStream.value,
          children: subActivities.map(activity => ({
            name: activity.value
          }))
        }))
      }))
    };

    return payload;
  };

  const handleSubmit = async () => {
    try {
      const payload = generateTreePayload();
      const response = await axios.post(
        "http://localhost:5000/api/generate-tree",
        payload
      );
      
      if (response.data.success) {
        setTreeData(response.data.data);
      } else {
        message.error("Failed to generate tree");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Error generating tree");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setNewItemTitle("");
    } else {
      // If we're on the last question, handle submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setNewItemTitle("");
    }
  };

  const handleAddNewItem = () => {
    if (newItemTitle.trim() && currentInputs.length < maxItems) {
      const newItem = {
        id: Date.now(),
        title: newItemTitle.trim(),
        value: newItemTitle.trim(),
        fixed: false,
        ...(currentQuestionNumber === 5 && { products: [] }),
        ...(currentQuestionNumber === 6 && { departments: [] }),
        ...(currentQuestionNumber === 7 && { 
          isExpanded: false,
          subActivities: []
        }),
      };

      setQuestionInputs((prev) => ({
        ...prev,
        [currentQuestionNumber]: [...prev[currentQuestionNumber], newItem],
      }));

      setNewItemTitle("");
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const itemToRemove = currentInputs[indexToRemove];
    if (!itemToRemove.fixed) {
      const updatedInputs = currentInputs.filter((_, index) => index !== indexToRemove);
      setQuestionInputs((prev) => ({
        ...prev,
        [currentQuestionNumber]: updatedInputs,
      }));
    }
  };

  const handleInputChange = (index, value) => {
    const item = currentInputs[index];
    if (!item.fixed) {
      const newInputs = [...currentInputs];
      newInputs[index] = {
        ...newInputs[index],
        value: value,
      };

      setQuestionInputs((prev) => ({
        ...prev,
        [currentQuestionNumber]: newInputs,
      }));
    }
  };

  const handleProductSelect = (streamIndex, productValue) => {
    if (!productValue) return;
    
    setQuestionInputs(prev => {
      const newInputs = [...prev[currentQuestionNumber]];
      const stream = newInputs[streamIndex];
      
      if (!stream.fixed) {
        if (!stream.products) stream.products = [];
        if (!stream.products.includes(productValue)) {
          stream.products.push(productValue);
        }
      }
      
      return {
        ...prev,
        [currentQuestionNumber]: newInputs
      };
    });
  };
  
  const handleRemoveProduct = (streamIndex, productIndex) => {
    setQuestionInputs(prev => {
      const newInputs = [...prev[currentQuestionNumber]];
      const stream = newInputs[streamIndex];
      
      if (!stream.fixed && stream.products) {
        stream.products = stream.products.filter((_, idx) => idx !== productIndex);
      }
      
      return {
        ...prev,
        [currentQuestionNumber]: newInputs
      };
    });
  };

  const toggleStreamExpansion = (streamId) => {
    setQuestionInputs(prev => {
      const newInputs = [...prev[7]];
      const streamIndex = newInputs.findIndex(s => s.id === streamId);
      newInputs[streamIndex] = { 
        ...newInputs[streamIndex], 
        isExpanded: !newInputs[streamIndex].isExpanded 
      };
      return { ...prev, 7: newInputs };
    });
  };
  
  const handleStreamChange = (streamId, value) => {
    setQuestionInputs(prev => {
      const newInputs = [...prev[7]];
      const streamIndex = newInputs.findIndex(s => s.id === streamId);
      newInputs[streamIndex] = { ...newInputs[streamIndex], value };
      return { ...prev, 7: newInputs };
    });
  };
  
  const handleSubActivityChange = (streamId, activityId, value) => {
    setQuestionInputs(prev => {
      const newInputs = [...prev[7]];
      const streamIndex = newInputs.findIndex(s => s.id === streamId);
      const newActivities = [...newInputs[streamIndex].subActivities];
      const activityIndex = newActivities.findIndex(a => a.id === activityId);
      newActivities[activityIndex] = { ...newActivities[activityIndex], value };
      newInputs[streamIndex] = { ...newInputs[streamIndex], subActivities: newActivities };
      return { ...prev, 7: newInputs };
    });
  };
  
  const handleAddNewSubActivity = (streamId) => {
    setQuestionInputs(prev => {
      const newInputs = [...prev[7]];
      const streamIndex = newInputs.findIndex(s => s.id === streamId);
      const newActivity = {
        id: Date.now(),
        placeholder: "New Sub-Activity",
        value: ""
      };
      newInputs[streamIndex].subActivities.push(newActivity);
      return { ...prev, 7: newInputs };
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-800">Asset Allocation</h1>
        <div className="rounded-full bg-white shadow px-3 py-1 text-sm text-gray-600">
          {currentQuestion + 1}/{questions.length}
        </div>
      </div>
  
      <div className="bg-gray-50 rounded-lg p-6 relative">
        <span className="bg-[#1e2b3b] text-white px-3 py-1 rounded text-sm inline-block mb-4">
          Level {currentQuestionData.level || ''}
        </span>
  
        <p className="text-base text-gray-800 mb-6">
          {currentQuestionData.description || ''}
        </p>
  
        {renderQuestionContent()}
      </div>
  
      <div className="flex justify-between mt-6">
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          ← Back
        </button>
        <button
          className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? 'Complete & Submit →' : 'Next →'}
        </button>
      </div>
  
      {treeData ? (
        <Tree treeData={treeData} />
      ) : null}
    </div>
  );
};

export default Questionnaire;
