import React, { useState } from "react";

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Create separate states for each question's inputs
  const [questionInputs, setQuestionInputs] = useState({
    1: [
      { id: 1, title: "Name of Segment 1", value: "Name of Segment 1", fixed: true },
      { id: 2, title: "Name of Segment 2", value: "Name of Segment 2", fixed: true },
      { id: 3, title: "Name of Segment 3", value: "Name of Segment 3", fixed: true },
      { id: 4, title: "Name of Segment 4", value: "Name of Segment 4", fixed: true },
      { id: 5, title: "Name of Segment 5", value: "Name of Segment 5", fixed: true },
    ],
    2: [
      { id: 1, title: "Cost of Production", value: "Cost of Production", fixed: true },
      { id: 2, title: "Cost of Selling", value: "Cost of Selling", fixed: true },
      { id: 3, title: "Cost of Marketing", value: "Cost of Marketing", fixed: true },
      { id: 4, title: "Cost of Research", value: "Cost of Research", fixed: true },
      { id: 5, title: "Corporate Costs", value: "Corporate Costs", fixed: true },
    ],
    3: [
      { id: 1, title: "Sales", value: "Sales", fixed: true },
      { id: 2, title: "Client Services", value: "Client Services", fixed: true },
      { id: 3, title: "Marketing", value: "Marketing", fixed: true },
      { id: 4, title: "Research", value: "Research", fixed: true },
      { id: 5, title: "Engineering", value: "Engineering", fixed: true },
      { id: 6, title: "Finance", value: "Finance", fixed: true },
      { id: 7, title: "Legal", value: "Legal", fixed: true },
    ],
    4: [
      { id: 1, title: "Cost of Production", value: "Cost of Production", fixed: true },
      { id: 2, title: "Cost of Selling", value: "Cost of Selling", fixed: true },
      { id: 3, title: "Cost of Marketing", value: "Cost of Marketing", fixed: true },
      { id: 4, title: "Cost of Research", value: "Cost of Research", fixed: true },
      { id: 5, title: "Corporate Costs", value: "Corporate Costs", fixed: true },
    ],
    5: [
      { id: 1, title: "Value-Stream 1", value: "Value-Stream 1", fixed: true, products: [] },
      { id: 2, title: "Value-Stream 2", value: "Value-Stream 2", fixed: true, products: [] },
      { id: 3, title: "Value-Stream 3", value: "Value-Stream 3", fixed: true, products: [] },
    ],
    6: [
      {
        id: 1,
        title: "Sales",
        value: "Sales",
        fixed: true,
        departments: [
          { id: 1, title: "Department 1", value: "Department 1", fixed: true },
          { id: 2, title: "Department 2", value: "Department 2", fixed: true },
          { id: 3, title: "Department 3", value: "Department 3", fixed: true },
        ]
      }
    ],
    7: [
      {
        id: 1,
        title: "Value-Stream 1",
        value: "Value-Stream 1",
        fixed: true,
        isExpanded: true,
        subActivities: [
          { id: 1, title: "Client Enhancement & Commits", value: "Client Enhancement & Commits", fixed: true },
          { id: 2, title: "Technical Debt & Risk Reduction", value: "Technical Debt & Risk Reduction", fixed: true },
          { id: 3, title: "Running Daily Operations", value: "Running Daily Operations", fixed: true },
        ]
      },
      {
        id: 2,
        title: "Value-Stream 2",
        value: "Value-Stream 2",
        fixed: true,
        isExpanded: false,
        subActivities: []
      },
      {
        id: 3,
        title: "Value-Stream 3",
        value: "Value-Stream 3",
        fixed: true,
        isExpanded: false,
        subActivities: []
      },
      {
        id: 4,
        title: "Value-Stream 4",
        value: "Value-Stream 4",
        fixed: true,
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
        id: Date.now(),
        title: newItemTitle.trim(),
        value: newItemTitle.trim(),
        fixed: false,
        // Add additional properties based on question type
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
  const renderQuestionContent = () => {
    switch (currentQuestion) {
        case 0: // Question 1 - Segments
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
        case 1: // Question 2 - Major Expense Activities
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(20%-16px)] min-w-[200px]">
                  {input.fixed ? (
                    // Fixed/Non-editable items
                    <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                      {input.title}
                    </div>
                  ) : (
                    // Custom added items
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
            
            {/* Add new item section */}
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
      
      case 2: // Question 3 - Functional Units
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
        case 3: // Question 4 - Primary Sub-activities
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-[calc(33.33%-16px)] min-w-[250px]">
                  <div className="flex flex-col gap-2">
                    {input.fixed ? (
                      // Fixed activity header
                      <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 font-medium">
                        {input.title}
                      </div>
                    ) : (
                      // Custom activity with remove button
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
            
            {/* Add new sub-activity section */}
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
      
      case 4: // Question 5 - Value Streams
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {currentInputs.map((input, idx) => (
                <div key={input.id} className="relative w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-[300px]">
                      {input.fixed ? (
                        // Fixed value stream
                        <div className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                          {input.title}
                        </div>
                      ) : (
                        // Custom value stream with remove button
                        <div className="relative">
                          <input
                            type="text"
                            value={input.value}
                            onChange={(e) => handleInputChange(idx, e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500"
                            placeholder="Enter value stream name"
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
      
                    {/* Products dropdown for each value stream */}
                    <div className="flex-1 relative">
                      <select
                        className={`w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-green-500 appearance-none
                          ${input.fixed ? 'bg-gray-50' : 'bg-white'}`}
                        value={input.selectedProduct || ''}
                        onChange={(e) => handleProductSelect(idx, e.target.value)}
                        disabled={input.fixed}
                      >
                        <option value="">Select Associated Products</option>
                        <option value="product1">Product 1</option>
                        <option value="product2">Product 2</option>
                        <option value="product3">Product 3</option>
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        ▼
                      </div>
                    </div>
                  </div>
      
                  {/* Display selected products if any */}
                  {input.products && input.products.length > 0 && (
                    <div className="mt-2 ml-[300px]">
                      <div className="flex flex-wrap gap-2">
                        {input.products.map((product, productIdx) => (
                          <span 
                            key={productIdx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                          >
                            {product}
                            {!input.fixed && (
                              <button
                                onClick={() => handleRemoveProduct(idx, productIdx)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                ✕
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Add new value stream section */}
            <div className="flex gap-3 items-center mt-4">
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Enter Value Stream Title"
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
                Add New Value Stream
              </button>
            </div>
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

      case 6: // Question 7 - Value Stream Sub-activities
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
