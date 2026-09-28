import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

router.get('/services', (req, res) => {
    const filters = {
        category: req.query.category,
        available: req.query.available
    };

    const services = serviceManager.getServices(filters);

    if (filters.category || filters.available !== undefined) {
        const filteredServices = serviceManager.getServices(filters);
        return res.status(200).json({
            status: "success",
            payload: filteredServices
        })
    } else {
        return res.status(200).json({
            status: "success",
            payload: services
        });
    }
});

router.get('/services/:id', (req, res) => {
    const id = Number(req.params.id);
    const service = serviceManager.getServiceById(id);
    if (service) {
        return res.status(200).json({
            status: "success",
            payload: service
        });
    } else {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    }
});

router.post('/services', (req, res) => {
    const { name, description, price, duration, available, category } = req.body;

    if (!name || !description || !price || !duration || !available === undefined || !category) {
        return res.status(400).json({
            status: "error",
            message: "Todos los campos son obligatorios"
        });
    };

    const newService = serviceManager.addService(
        name,
        description,
        duration,
        price,
        category,
        available
    );

    if (newService)
        return res.status(201).json({
            status: "success",
            message: "Servicio creado exitosamente",
            payload: newService
        });
    else
        return res.status(500).json({
            status: "error",
            message: "Error al crear el servicio"
        });
});

router.put('/services/:id', (req, res) => {
    const id = Number(req.params.id);
    const serviceIndex = serviceManager.getServiceById(id);

    if (!serviceIndex) {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    }

    const { name, description, price, duration, available, category } = req.body;
    if (!name || !description || !price || !duration || !available === undefined || !category) {
        return res.status(400).json({
            status: "error",
            message: "Todos los campos son obligatorios"
        });
    }

    const updatedService = serviceManager.updateService(
        id, {
        name,
        description,
        price,
        duration,
        available,
        category
    }
    );

    return res.status(200).json({
        status: "success",
        message: "Servicio actualizado exitosamente",
        payload: updatedService
    });
});

router.delete('/services/:id', (req, res) => {
    const id = Number(req.params.id);
    const serviceIndex = serviceManager.getServiceById(id);

    if (!serviceIndex) {
        return res.status(404).json({
            status: "error",
            message: "Servicio no encontrado"
        });
    } else {
        const deletedService = serviceManager.deleteService(id);
        if (deletedService) {
            return res.status(200).json({
                status: "success",
                message: "Servicio eliminado exitosamente"
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: "Error al eliminar el servicio"
            });
        }
    }
});

export default router;