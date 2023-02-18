<script lang="ts">
    import { currentUser, pb } from '$lib/pocketbase';
	let userData = {
		personal_info: [
			{
				name: '',
				email: '',
				phone: '',
				github: '',
				linkedin: ''
			}
		],
		objective: [
			{
				objective: ''
			}
		],
		education: [
			{
				school_name: '',
				degree: '',
				gpa: '',
				school_description: '',
				school_start_date: '',
				school_end_date: ''
			}
		],
		employment: [
			{
				company_name: '',
				company_city: '',
				job_name: '',
				job_start_date: '',
				job_end_date: '',
				job_description: ''
			}
		],
		projects: [
			{
				project_name: '',
				project_start_date: '',
				project_end_date: '',
				project_description: ''
			}
		],
		skills: [
			{
				skill_name: '',
				skill_description: ''
			}
		]
	};
    function alertUserData() {
        alert(JSON.stringify(userData));
    }
    function clearUserData() {
        userData = {
            personal_info: [
                {
                    name: '',
                    email: '',
                    phone: '',
                    github: '',
                    linkedin: ''
                }
            ],
            objective: [
                {
                    objective: ''
                }
            ],
            education: [
                {
                    school_name: '',
                    degree: '',
                    gpa: '',
                    school_description: '',
                    school_start_date: '',
                    school_end_date: ''
                }
            ],
            employment: [
                {
                    company_name: '',
                    company_city: '',
                    job_name: '',
                    job_start_date: '',
                    job_end_date: '',
                    job_description: ''
                }
            ],
            projects: [
                {
                    project_name: '',
                    project_start_date: '',
                    project_end_date: '',
                    project_description: ''
                }
            ],
            skills: [
                {
                    skill_name: '',
                    skill_description: ''
                }
            ]
        };
    }
    function fetchUserData() {
        const userId = pb.authStore.model?.id;
        // Ensure userId is a valid string and not undefined
        if (userId === undefined) {
            alert("You must be logged in to fetch your data.");
            return;
        }
        // TODO: Handle error
        pb.collection('users').getOne(userId).then((data) => {
            userData = data.userData;
        });
    }
    async function saveUserData() {
        const postingData = {
            "userData": userData,
        };
        console.log("Looking for this user: " + pb.authStore.model?.id);
        const userId = pb.authStore.model?.id;
        // Ensure userId is a valid string and not undefined
        if (userId === undefined) {
            alert("You must be logged in to save your data.");
            return;
        }
        const record = await pb.collection('users').update(userId, postingData);
        console.log("Saved record!");
        console.log(record);
    }
</script>

<h1>User Info:</h1>

<form>
    <h3>Personal Info</h3>
    <!-- Label and text input for first and last name -->
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={userData.personal_info[0].name} />
    <!-- Label and text input for email -->
    <label for="email">Email:</label>
    <input type="text" id="email" bind:value={userData.personal_info[0].email} />
    <!-- Label and text input for phone -->
    <label for="phone">Phone:</label>
    <input type="text" id="phone" bind:value={userData.personal_info[0].phone} />
    <!-- Label and text input for github -->
    <label for="github">Github:</label>
    <input type="text" id="github" bind:value={userData.personal_info[0].github} />
    <!-- Label and text input for linkedin -->
    <label for="linkedin">LinkedIn:</label>
    <input type="text" id="linkedin" bind:value={userData.personal_info[0].linkedin} />

    <h3>Objective</h3>
    <!-- Label and text input for objective -->
    <label for="objective">Objective:</label>
    <input type="text" id="objective" bind:value={userData.objective[0].objective} />

    <h3>Education</h3>
    <!-- Label and text input for school name -->
    <label for="school_name">School Name:</label>
    <input type="text" id="school_name" bind:value={userData.education[0].school_name} />
    <!-- Label and text input for degree -->
    <label for="degree">Degree:</label>
    <input type="text" id="degree" bind:value={userData.education[0].degree} />
    <!-- Label and text input for gpa -->
    <label for="gpa">GPA:</label>
    <input type="text" id="gpa" bind:value={userData.education[0].gpa} />
    <!-- Label and text input for school description -->
    <label for="school_description">School Description:</label>
    <input type="text" id="school_description" bind:value={userData.education[0].school_description} />
    <!-- Label and text input for school start date -->
    <label for="school_start_date">School Start Date:</label>
    <input type="text" id="school_start_date" bind:value={userData.education[0].school_start_date} />
    <!-- Label and text input for school end date -->
    <label for="school_end_date">School End Date:</label>
    <input type="text" id="school_end_date" bind:value={userData.education[0].school_end_date} />

    <h3>Employment</h3>
    <!-- Label and text input for company name -->
    <label for="company_name">Company Name:</label>
    <input type="text" id="company_name" bind:value={userData.employment[0].company_name} />
    <!-- Label and text input for company city -->
    <label for="company_city">Company City:</label>
    <input type="text" id="company_city" bind:value={userData.employment[0].company_city} />
    <!-- Label and text input for job name -->
    <label for="job_name">Job Name:</label>
    <input type="text" id="job_name" bind:value={userData.employment[0].job_name} />
    <!-- Label and text input for job start date -->
    <label for="job_start_date">Job Start Date:</label>
    <input type="text" id="job_start_date" bind:value={userData.employment[0].job_start_date} />
    <!-- Label and text input for job end date -->
    <label for="job_end_date">Job End Date:</label>
    <input type="text" id="job_end_date" bind:value={userData.employment[0].job_end_date} />
    <!-- Label and text input for job description -->
    <label for="job_description">Job Description:</label>
    <input type="text" id="job_description" bind:value={userData.employment[0].job_description} />
    
    <h3>Projects</h3>
    <!-- Label and text input for project name -->
    <label for="project_name">Project Name:</label>
    <input type="text" id="project_name" bind:value={userData.projects[0].project_name} />
    <!-- Label and text input for project start date -->
    <label for="project_start_date">Project Start Date:</label>
    <input type="text" id="project_start_date" bind:value={userData.projects[0].project_start_date} />
    <!-- Label and text input for project end date -->
    <label for="project_end_date">Project End Date:</label>
    <input type="text" id="project_end_date" bind:value={userData.projects[0].project_end_date} />
    <!-- Label and text input for project description -->
    <label for="project_description">Project Description:</label>
    <input type="text" id="project_description" bind:value={userData.projects[0].project_description} />

    <h3>Skills</h3>
    <!-- Label and text input for skill name -->
    <label for="skill_name">Skill Name:</label>
    <input type="text" id="skill_name" bind:value={userData.skills[0].skill_name} />
    <!-- Label and text input for skill description -->
    <label for="skill_description">Skill Description:</label>
    <input type="text" id="skill_description" bind:value={userData.skills[0].skill_description} />
</form>
<button on:click={alertUserData}>Alert Current User Data</button>
<button on:click={clearUserData}>Clear User Data</button>
<button on:click={fetchUserData}>Get User Data from Database</button>
<button on:click={saveUserData}>Update User Data in Database</button>

<style>
</style>
