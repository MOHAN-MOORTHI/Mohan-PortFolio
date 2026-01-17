import api from './api';

// Re-export api as adminService for semantic clarity or add specific admin methods
// Currently our API service handles the interceptor, so direct calls are fine, 
// but wrapping them helps if we add more logic later.

const adminService = {
    // Hero
    getHeroFn: () => api.get('/hero'),
    updateHeroFn: (data) => api.put('/hero', data),

    // About
    getAboutFn: () => api.get('/about'),
    updateAboutFn: (data) => api.put('/about', data),

    // Skills
    getSkillsFn: () => api.get('/skills'),
    addSkillFn: (data) => api.post('/skills', data),
    deleteSkillFn: (id) => api.delete(`/skills/${id}`),

    // Projects
    getProjectsFn: () => api.get('/projects'),
    addProjectFn: (data) => api.post('/projects', data),
    deleteProjectFn: (id) => api.delete(`/projects/${id}`),
    updateProjectFn: (id, data) => api.put(`/projects/${id}`, data),

    // Experience
    getExperienceFn: () => api.get('/experience'),
    addExperienceFn: (data) => api.post('/experience', data),
    deleteExperienceFn: (id) => api.delete(`/experience/${id}`),
    updateExperienceFn: (id, data) => api.put(`/experience/${id}`, data),

    // Certifications
    getCertificationsFn: () => api.get('/certifications'),
    addCertificationFn: (data) => api.post('/certifications', data),
    deleteCertificationFn: (id) => api.delete(`/certifications/${id}`),

    // Contact
    getMessagesFn: () => api.get('/contact'),
    deleteMessageFn: (id) => api.delete(`/contact/${id}`),

    // Upload
    uploadImageFn: (formData) => api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
};

export default adminService;
