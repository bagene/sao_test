const axios = require('axios');

const url = 'https://app.asana.com/api/1.0/';
const headers = {
	'Authorization': 'Bearer 0/63d2cdb155c7a13e8684440475fda9a3'
};
const workspace = '1108606860294744';

function index(req, res) {
	axios.get(`${url}projects/${req.params.project_id}/tasks`, { headers })
		.then((response) => {
			res.json(response.data.data);
		})
		.catch((err) => {
			console.log(err.response.data);
		});
}

function store(req, res) {
	let data = req.body;
	data = {
		projects: [ req.params.project_id ],
		workspace,
		...data,
	};

	axios.post(`${url}tasks`, 
		{ data },
		{ headers })
		.then((response) => {
			res.json(response.data.data);
		})
		.catch((err) => {
			console.log(err.response.data);
		})
}

function storeSubTask(req, res) {
	let data = req.body;

	data = {
		workspace,
		...data,
	}

	axios.post(`${url}tasks/${req.params.task_id}/subtasks`, 
		{ data },
		{ headers })
		.then((response) => {
			res.json(response.data.data);
		})
		.catch((err) => {
			console.log(err.response.data);
		})
}

function getUsers(req, res) {
	axios.get(`${url}workspaces/${workspace}/users`, { headers })
		.then((response) => {
			res.json(response.data.data);
		})
		.catch((err) => {
			console.log(err.response.data);
		});
}

module.exports = {index, store, storeSubTask, getUsers};