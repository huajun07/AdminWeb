import { alertService } from './index.js';

const server_URL = "http://34.87.50.188:8000/api/router";

const returnFunc = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.content) || response.status;
        return Promise.reject(error);
    }
    return data;
}

const getProjects = (columns) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authID: "",
          serviceName: "getTable",
          content: {
            objName: "project",
            columns
          }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const addProject = () =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authID: "",
          serviceName: "createProject",
          content: {
            projectName: "",
            projectType: "",
            location: "",
            contactNumber: "",
            maCompany: "",
            equipManu: ""
          }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getGate = (ID, columns) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "getTable",
            content: {
            objName: "gate",
            columns,
            filters:{
                projectID: ID
            }
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getDevice = (ID, columns) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authID: "",
          serviceName: "getTable",
          content: {
            objName: "device",
            columns,
            filters:{
              gateID: ID
            }
          }
        })
      };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const createGate = (ID) =>{
    const newGateReq = {
        projectID: ID,
        gateName: "New Gate",
        gateType: "entry",
        isOpenForInvalid: false,
        isOpenForTemp: false,
        isChargeable: false,
        ledOnTime: "00:00:00",
        ledOffTime: "00:00:00"
        }
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "createGate",
            content: newGateReq
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const createDevice = (gateID, deviceID) =>{
    const newDeviceReq = {
        deviceID,
        gateID,
        deviceName: "Front Entry Camera",
        deviceType: "LPR camera",
        deviceCarpark: "Trevista Car Park",
        deviceStatus: "online",
        manufacturer: "example manufacturer",
        manufacturerCode: "xyz123",
        direction: "entry",
        isPrimaryDevice: true

        }
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "createDevice",
            content: newDeviceReq
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getProjectInfo = (ID) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "getProject",
            content: {
            projectID: ID
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const updateProjectInfo = (ID, state) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "modifyProject",
            content: {
            projectID: ID,
            modifyParams: state
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getBusinessInfo = (ID) =>{
    //Pending Function
    const requestOptions = {
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const updateBusinessInfo = (ID, state) =>{
    //Pending function
    const requestOptions = {
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getGateInfo = (ID) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "getGate",
            content: {
                gateID: ID
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const updateGateInfo = (ID, state) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "modifyGate",
            content: {
                gateID: ID,
                modifyParams: state
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const getDeviceInfo = (ID) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authID: "",
          serviceName: "getDevice",
          content: {
              deviceID: ID
          }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

const updateDeviceInfo = (ID, state) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            authID: "",
            serviceName: "modifyDevice",
            content: {
                deviceID: ID,
                modifyParams: state
            }
        })
    };
    return fetch(server_URL, requestOptions)
    .then(returnFunc)
}

export {
    getGate,
    getDevice,
    createGate,
    createDevice,
    getProjectInfo,
    updateProjectInfo,
    getBusinessInfo,
    updateBusinessInfo,
    getGateInfo,
    updateGateInfo,
    getDeviceInfo,
    updateDeviceInfo,
    getProjects,
    addProject
};