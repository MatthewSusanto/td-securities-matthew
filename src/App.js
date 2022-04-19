import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import localJson from './Assets/resource_data.json';
import TreeView from './Components/TreeView';
import { editResource } from './Redux/Actions/ResourceActions';
import ResourceLayout from './Layout/ResourceLayout';
import './Assets/CSS/App.css';

function App() {
  const dispatch = useDispatch();
  const globalResourceData = useSelector((state) => state.resource.resourceData);

  useEffect(() => {
    dispatch(editResource(localJson));
  }, [dispatch]);

  return (
    <div className="App">
      <ResourceLayout siderContent={<TreeView resourceProp={globalResourceData} mainTree={true} allowEdit={true} />} />
    </div>
  );
}

export default App;
