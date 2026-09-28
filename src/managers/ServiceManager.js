import crypto from "crypto";

export class ServiceManager {
    constructor() {
        this.services = [{
            id: 1,
            name: 'Consulta general',
            description: 'Atención médica general',
            duration: 30,
            price: 2500,
            category: 'salud',
            available: true
        },
        {
            id: 2,
            name: 'Control cardiológico',
            description: 'Evaluación y seguimiento cardiovascular',
            duration: 45,
            price: 4200,
            category: 'salud',
            available: false
        },
        {
            id: 3,
            name: 'Masaje relajante',
            description: 'Sesión de relajación y bienestar',
            duration: 60,
            price: 3500,
            category: 'bienestar',
            available: false
        }];
    }

    getServices(filters = {}) {
        const { category, available } = filters;

        let filteredServices = [...this.services];

        if (category) {
            filteredServices = filteredServices.filter(service => service.category === category);
        }
        if (available !== undefined) {
            const isAvailable = available === 'true' || available === true;
            filteredServices = filteredServices.filter(service => service.available === isAvailable);
        }

        return filteredServices;
    }

    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }

    addService(name, description, duration, price, category, available) {
        const newService = {
            id: crypto.randomUUID(),
            name,
            description,
            duration,
            price,
            category,
            available
        };
        this.services.push(newService);
        return newService;
    }

    updateService(id, data) {
        const service = this.getServiceById(id);
        if (service) {
            Object.assign(service, data);
            return service;
        }
        return null;
    }

    deleteService(id) {
        const index = this.services.findIndex(service => service.id === id);
        if (index !== -1) {
            return this.services.splice(index, 1);
        }
        return null;
    }
}