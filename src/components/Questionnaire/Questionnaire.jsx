import React, { useState } from "react";

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Create separate states for each question's inputs
  const [questionInputs, setQuestionInputs] = useState({
    1: [
      { id: 1, placeholder: "Name of Segment 1", value: "" },
      { id: 2, placeholder: "Name of Segment 2", value: "" },
      { id: 3, placeholder: "Name of Segment 3", value: "" },
      { id: 4, placeholder: "Name of Segment 4", value: "" },
      { id: 5, placeholder: "Name of Segment 5", value: "" },
    ],
    2: [
      { id: 1, placeholder: "Cost of Production", value: "" },
      { id: 2, placeholder: "Cost of Selling", value: "" },
      { id: 3, placeholder: "Cost of Marketing", value: "" },
      { id: 4, placeholder: "Cost of Research", value: "" },
      { id: 5, placeholder: "Corporate Costs", value: "" },
    ],
    3: [
        { id: 1, placeholder: "Sales", value: "" },
        { id: 2, placeholder: "Client Services", value: "" },
        { id: 3, placeholder: "Marketing", value: "" },
        { id: 4, placeholder: "Research", value: "" },
        { id: 5, placeholder: "Engineering", value: "" },
        { id: 6, placeholder: "Finance", value: "" },
        { id: 7, placeholder: "Legal", value: "" },
      ],
      4: [
        { id: 1, placeholder: "Cost of Production", value: "" },
        { id: 2, placeholder: "Cost of Selling", value: "" },
        { id: 3, placeholder: "Cost of Marketing", value: "" },
        { id: 4, placeholder: "Cost of Research", value: "" },
        { id: 5, placeholder: "Corporate Costs", value: "" },
      ],
      5: [
        { id: 1, placeholder: "Value-Stream 1", value: "", products: [] },
        { id: 2, placeholder: "Value-Stream 2", value: "", products: [] },
        { id: 3, placeholder: "Value-Stream 3", value: "", products: [] },
      ],
      6: [
        {
          id: 1,
          placeholder: "Sales",
          value: "",
          departments: [
            { id: 1, placeholder: "Department 1", value: "" },
            { id: 2, placeholder: "Department 2", value: "" },
            { id: 3, placeholder: "Department 3", value: "" },
          ]
        }
        // Add other functions as needed
      ],
      7: [
        {
          id: 1,
          placeholder: "Value-Stream 1",
          value: "",
          isExpanded: true,
          subActivities: [
            { id: 1, placeholder: "Client Enhancement & Commits", value: "" },
            { id: 2, placeholder: "Technical Debt & Risk Reduction", value: "" },
            { id: 3, placeholder: "Running Daily Operations", value: "" },
          ]
        },
        {
          id: 2,
          placeholder: "Value-Stream 2",
          value: "",
          isExpanded: false,
          subActivities: []
        },
        {
          id: 3,
          placeholder: "Value-Stream 3",
          value: "",
          isExpanded: false,
          subActivities: []
        },
        {
          id: 4,
          placeholder: "Value-Stream 4",
          value: "",
          isExpanded: false,
          subActivities: []
        }
      ],
  });

  const [newItemTitle, setNewItemTitle] = useState("");
  const maxItems = 8;

  const questions = [
    {
      level: 1,
      text: "Please indicate the primary operating segments within your company which you currently track",
      type: "segments",
      dropdownPlaceholder: "Enter Segment Title",
      addButtonText: "Add New Segment",
    },
    {
      level: 2,
      text: "Please indicate the major expense activities most relevant for your firm",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Activity",
    },
    {
      level: 3,
      text: "Please indicate the functional units around which your firm is organized",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Function",
    },
    {
      level: 4,
      text: "Please indicate the primary sub-activities within each activity(note this should cycle through the Level 2 activities)",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Function",
    },
    {
      level: 5,
      text: "Please indicate the value streams or sub-streams which are most relevant for your firm",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Value-Stream",
    },
    {
      level: 6,
      text: "Please indicate the Department within which each function",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Department",
    },
    {
      level: 7,
      text: "Please indicate the relevant sub-activities within each value-stream",
      type: "activities",
      dropdownPlaceholder: "Enter Activity Title",
      addButtonText: "Add New Function",
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setNewItemTitle("");
      console.log(
        "Current Question Inputs:",
        questionInputs[currentQuestion + 1]
      );
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setNewItemTitle("");
    }
  };

  const currentQuestionNumber = currentQuestion + 1;
  const currentInputs = questionInputs[currentQuestionNumber] || [];

  const handleAddNewItem = () => {
    if (newItemTitle.trim() && currentInputs.length < maxItems) {
      const newItem = {
        id: Date.now(), // Using timestamp for unique id
        placeholder: newItemTitle.trim(),
        value: "", // Initialize with empty value
      };

      const updatedInputs = [...currentInputs, newItem];

      setQuestionInputs((prev) => ({
        ...prev,
        [currentQuestionNumber]: updatedInputs,
      }));

      setNewItemTitle("");
      console.log("Added new item:", newItem);
      console.log("Updated inputs:", updatedInputs);
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedInputs = currentInputs.filter(
      (_, index) => index !== indexToRemove
    );
    setQuestionInputs((prev) => ({
      ...prev,
      [currentQuestionNumber]: updatedInputs,
    }));
    console.log("Removed item at index:", indexToRemove);
    console.log("Updated inputs:", updatedInputs);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...currentInputs];
    newInputs[index] = {
      ...newInputs[index],
      value: value,
    };

    setQuestionInputs((prev) => ({
      ...prev,
      [currentQuestionNumber]: newInputs,
    }));

    console.log(
      `Question ${currentQuestionNumber}, Input ${index + 1} value:`,
      value
    );
  };
  const renderQuestionContent = () => {
    switch (currentQuestion) {
      case 0: // Question 1 - Segments
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    value={input.value}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
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

      case 1: // Question 2 - Activities
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    value={input.value}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
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
                className="border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
              >
                Add New Activity
              </button>
            </div>
          </div>
        );

      case 2: // Question 3 - Functions
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    value={input.value}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
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
                className="border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
              >
                Add New Function
              </button>
            </div>
          </div>
        );
        case 3: // Question 4 - Sub-activities
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    value={input.value}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
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
                className="border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
              >
                Add New Activity
              </button>
            </div>
          </div>
        );

      case 4: // Question 5 - Value Streams
        return (
          <div className="flex flex-col gap-4">
            {currentInputs.map((input, idx) => (
              <div key={input.id} className="flex gap-4">
                <div className="relative w-[200px]">
                  <input
                    type="text"
                    placeholder={input.placeholder}
                    value={input.value}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>
                
                <div className="relative flex-1">
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500 appearance-none bg-white text-gray-500"
                    value=""
                    onChange={(e) => handleProductSelect(idx, e.target.value)}
                  >
                    <option value="">Select Product</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
            ))}
            
            <button
              onClick={handleAddNewItem}
              className="w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
            >
              Add New Value-Stream
            </button>
          </div>
        );

      case 5: // Question 6 - Departments
        return (
          <div className="flex flex-col gap-6">
            {currentInputs.map((function_item) => (
              <div key={function_item.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1e2b3b]"></div>
                  <div className="relative w-[200px]">
                    <input
                      type="text"
                      placeholder={function_item.placeholder}
                      value={function_item.value}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                      onChange={(e) => handleFunctionChange(function_item.id, e.target.value)}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>
                </div>

                <div className="ml-6 pl-4 border-l-2 border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    {function_item.departments.map((dept) => (
                      <div key={dept.id} className="relative w-[200px]">
                        <input
                          type="text"
                          placeholder={dept.placeholder}
                          value={dept.value}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                          onChange={(e) => handleDepartmentChange(function_item.id, dept.id, e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          ⋮
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => handleAddNewDepartment(function_item.id)}
                      className="w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Add New Department
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 6: // Question 7 - Value Stream Sub-activities
        return (
          <div className="flex flex-col gap-4">
            {currentInputs.map((stream) => (
              <div key={stream.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    className="w-4 h-4 rounded-full bg-[#1e2b3b] flex items-center justify-center text-white text-xs"
                    onClick={() => toggleStreamExpansion(stream.id)}
                  >
                    {stream.isExpanded ? "-" : "+"}
                  </button>
                  <div className="relative w-[200px]">
                    <input
                      type="text"
                      placeholder={stream.placeholder}
                      value={stream.value}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                      onChange={(e) => handleStreamChange(stream.id, e.target.value)}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>
                </div>

                {stream.isExpanded && (
                  <div className="ml-6 pl-4 border-l-2 border-gray-200">
                    <div className="flex flex-wrap gap-4">
                      {stream.subActivities.map((activity) => (
                        <div key={activity.id} className="relative w-[300px]">
                          <input
                            type="text"
                            placeholder={activity.placeholder}
                            value={activity.value}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                            onChange={(e) => handleSubActivityChange(stream.id, activity.id, e.target.value)}
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            ⋮
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={() => handleAddNewSubActivity(stream.id)}
                        className="w-[200px] border-2 border-dashed border-gray-200 px-4 py-2 rounded text-gray-600 hover:border-green-500 hover:bg-gray-50 transition-colors text-sm"
                      >
                        Add New Sub-Activity
                      </button>
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
  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-800">Asset Allocation</h1>
        <div className="rounded-full bg-white shadow px-3 py-1 text-sm text-gray-600">
          {currentQuestion + 1}/7
        </div>
      </div>
  
      <div className="bg-gray-50 rounded-lg p-6 relative">
        <span className="bg-[#1e2b3b] text-white px-3 py-1 rounded text-sm inline-block mb-4">
          Level {questions[currentQuestion].level}
        </span>
  
        <p className="text-base text-gray-800 mb-6">
          {questions[currentQuestion].text}
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
    </div>
  );
};
// Add handlers for stream expansion and changes
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

export default Questionnaire;
