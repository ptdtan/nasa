const axios = require('axios');
const FormData = require('form-data');

/* 
 * In this example, we use a very simple pipeline that accepts the input as a file path on the server, then 
 * compute the xxhash for that file. 
 */

/*
 * How to submit one workflow
 */
var bodyFormData = new FormData();
// The url of the workflow pipeline. Must be get from bioturing webadmin
bodyFormData.append('workflowUrl', 'https://bioturingdownload.s3.amazonaws.com/example.wdl?AWSAccessKeyId=AKIAWS6JIOV3KTBZSRPP&Signature=Sc3w6l6iSgK9aQDMsBDK1ouUiLE%3D&Expires=1652375168');
// workflow type. Only WDL at the moment
bodyFormData.append('workflowType', 'WDL');
// workflow input. this is specific for each workflow.
bodyFormData.append('workflowInputs', "{'test.example_file': '/mnt/tan/SoftWare/cromwell/example.wdl'}");

// Content-Type for the POST request
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// POST api to submit one workflow
axios({
  method: 'post',
  url: 'http://192.168.10.24:8000/api/workflows/v1',
  data: bodyFormData,
  headers: {'Content-Type':`multipart/form-data; boundary=${bodyFormData._boundary}`}
})
  .then(response => {
	// Try to get label of the job we just submitted
	axios({
	  method: 'get',
	  url: `http://192.168.10.24:8000/api/workflows/v1/${response.data.id}/status`
	})
	  .then(response => {
		console.log(response);
	  })
	  .catch(error => {
	    console.log("Response status code", error.response.status);
	    console.log("Error message", error.response.data.message);
	  });
    console.log(response.data);
    /* response.data should be like this
     * { id: '2e706b4a-69d0-400e-8e6b-6c91e1212127',
  status: 'Submitted' }
     */
  })
  .catch(error => {
    console.log(error);
  });


