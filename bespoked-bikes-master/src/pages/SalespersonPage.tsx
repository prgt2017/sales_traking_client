import React, { useEffect, useState } from 'react';
import { Salesperson } from '../types/Salesperson';
import { fetchSalespersons, updateSalesperson } from '../services/api';
import SalespersonList from '../components/Salespersons/SalespersonList';
import { RingLoader } from 'react-spinners';
import SalespersonForm from '../components/Salespersons/SalespersonForm';
import SalespersonCommissionReport from '../components/Salespersons/SalespersonCommissionReport';
import { toast } from 'react-toastify';

const SalespersonPage: React.FC = () => {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState<Salesperson | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  useEffect(() => {
    const getSalespersons = async () => {
      setLoading(true);
      try {
        const data = await fetchSalespersons();
        setSalespersons(data);
      } catch (error) {
        console.error('Error fetching salespersons:', error);
        toast.error('Failed to fetch salespersons.');
      } finally {
        setLoading(false);
      }
    };
    getSalespersons();
  }, []);

  const handleEdit = (salesperson: Salesperson) => {
    setSelectedSalesperson(salesperson);
  };

  const handleSave = async (updatedSalesperson: Salesperson) => {
    try {
      const savedSalesperson = await updateSalesperson(updatedSalesperson);
      setSalespersons((prevSalespersons) =>
        prevSalespersons.map((sp) =>
          sp.id === savedSalesperson.id ? savedSalesperson : sp
        )
      );
      setSelectedSalesperson(null);
      toast.success('Salesperson updated successfully!');
    } catch (error) {
      console.log(error);
      console.error('Error updating salesperson:', error);
      toast.error('Failed to update salesperson. Please try again.');
    }
  };

  const handleCancel = () => {
    setSelectedSalesperson(null);
  };

  const toggleReport = () => {
    setShowReport((prevShowReport) => !prevShowReport);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Salespersons List</h2>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <RingLoader size={60} color="#123abc" loading={loading} />
        </div>
      ) : (
        <>
          <div className="mb-3 text-right">
            <button className="btn btn-primary" onClick={toggleReport}>
              {showReport ? 'Hide Report' : 'Show Commission Report'}
            </button>
          </div>
          {showReport ? (
            <SalespersonCommissionReport />
          ) : (
            <>
              <SalespersonList
                salespersons={salespersons}
                loading={loading}
                handleEdit={handleEdit}
              />
              {selectedSalesperson && (
                <SalespersonForm
                  salesperson={selectedSalesperson}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SalespersonPage;
