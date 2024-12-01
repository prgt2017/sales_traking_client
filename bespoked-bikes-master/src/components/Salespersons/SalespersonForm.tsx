import React, { useState, useEffect } from 'react';
import { Salesperson } from '../../types/Salesperson';

interface SalespersonFormProps {
    salesperson: Salesperson;
    onSave: (salesperson: Salesperson) => void;
    onCancel: () => void;
}

const SalespersonForm: React.FC<SalespersonFormProps> = ({ salesperson, onSave, onCancel }) => {
    // State to hold form values
    const [firstName, setFirstName] = useState<string>(salesperson.firstName);
    const [lastName, setLastName] = useState<string>(salesperson.lastName);
    const [address, setAddress] = useState<string>(salesperson.address);
    const [phone, setPhone] = useState<string>(salesperson.phone);
    const [startDate, setStartDate] = useState<string>(salesperson.startDate);
    const [terminationDate, setTerminationDate] = useState<string | undefined>(salesperson.terminationDate);
    const [manager, setManager] = useState<string>(salesperson.manager);
    const [commissionPercentage, setCommissionPercentage] = useState<number>(salesperson.commissionPercentage);

    // Effect to update state when salesperson prop changes
    useEffect(() => {
        setFirstName(salesperson.firstName);
        setLastName(salesperson.lastName);
        setAddress(salesperson.address);
        setPhone(salesperson.phone);
        setStartDate(salesperson.startDate);
        setTerminationDate(salesperson.terminationDate);
        setManager(salesperson.manager);
        setCommissionPercentage(salesperson.commissionPercentage);
    }, [salesperson]);

    const handleSave = () => {
        const updatedSalesperson: Salesperson = {
            ...salesperson,
            firstName,
            lastName,
            address,
            phone,
            startDate,
            terminationDate,
            manager,
            commissionPercentage,
        };
        onSave(updatedSalesperson);  
    };

    return (
        <div className="mb-4">
            <h3>Edit Salesperson</h3>
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>First Name</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Last Name</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Address</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Phone</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Start Date</strong></label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Termination Date</strong></label>
                        <input
                            type="date"
                            className="form-control"
                            value={terminationDate || ''}
                            onChange={(e) => setTerminationDate(e.target.value || undefined)} // Handle undefined terminationDate
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Manager</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            placeholder="Manager"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label><strong>Manager</strong></label>
                        <input
                            type="number"
                            className="form-control"
                            value={commissionPercentage}
                            onChange={(e) => setCommissionPercentage(parseFloat(e.target.value))}
                            placeholder="Commission Percentage"
                        />
                    </div>
                </div>
            </div>
            <div className="form-group mt-3">
                <button className="btn btn-primary" onClick={handleSave}>
                    Update
                </button>
                <button className="btn btn-secondary ml-2" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SalespersonForm;
