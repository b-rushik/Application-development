import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { getCurrentUser } from '../../utils/auth';

const DataAccess = () => {
  const [activeTab, setActiveTab] = useState('EXPERTS');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [currentPaper, setCurrentPaper] = useState(null);

  const tabs = [
    { id: 'EXPERTS', label: 'Subject Experts' },
    { id: 'PAPERS', label: 'Question Papers' },
    { id: 'SETTERS', label: 'Paper Setters' },
    { id: 'GETTERS', label: 'Paper Getters' },
    { id: 'ADMINS', label: 'Admins' }
  ];

  const fetchData = async (type) => {
    setLoading(true);
    try {
      let query;
      switch (type) {
        case 'EXPERTS':
          query = `query ListSubjectExperts {
            listSubjectExperts {
              items {
                id
                name
                expertise
                organization
                contactEmail
                verificationStatus
              }
            }
          }`;
          break;
        case 'PAPERS':
          query = `query ListPaperRequests {
            listPaperRequests {
              items {
                id
                subject
                status
                examDate
                paperSetterId
                paperGetterId
                paperFile
                rating
              }
            }
          }`;
          break;
        case 'SETTERS':
          query = `query ListPaperSetters {
            listPaperSetters {
              items {
                id
                organization
                branch
                subjects
                experience
                rating
                verified
                createdAt
              }
            }
          }`;
          break;
        case 'GETTERS':
          query = `query ListPaperGetters {
            listPaperGetters {
              items {
                id
                organization
                verified
                createdAt
                lastActivity
              }
            }
          }`;
          break;
        case 'ADMINS':
          query = `query ListAdmins {
            listAdmins {
              items {
                id
                email
                createdAt
                lastLogin
              }
            }
          }`;
          break;
        default:
          return;
      }

      const result = await API.graphql({ query });
      const items = result.data[`list${type}`]?.items || [];
      setData(items);
    } catch (error) {
      console.error(`Error fetching ${activeTab} data:`, error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleDownloadPaper = async (paperId, paperFile) => {
    try {
      const url = await Storage.get(paperFile);
      setDownloadUrl(url);
      setCurrentPaper(paperId);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error downloading paper:', error);
      alert('Failed to download paper');
    }
  };

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return Object.values(item).some(
      value => value && value.toString().toLowerCase().includes(searchLower)
    );
  });

  const renderTable = () => {
    if (loading) return <p>Loading data...</p>;
    if (filteredData.length === 0) return <p>No data available</p>;

    const columns = Object.keys(filteredData[0]).filter(key => key !== '__typename');

    return (
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>{column}</th>
              ))}
              {activeTab === 'PAPERS' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id || index}>
                {columns.map(column => (
                  <td key={`${item.id}-${column}`}>
                    {column === 'examDate' || column === 'createdAt' || column === 'lastLogin' || column === 'lastActivity'
                      ? new Date(item[column]).toLocaleString()
                      : item[column]}
                  </td>
                ))}
                {activeTab === 'PAPERS' && (
                  <td>
                    {item.paperFile && (
                      <button
                        onClick={() => handleDownloadPaper(item.id, item.paperFile)}
                        className="btn btn-primary btn-sm"
                      >
                        Download
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="data-access-page">
      <h1>Super User Data Access</h1>
      
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="data-container">
        <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
        {renderTable()}
      </div>

      {downloadUrl && currentPaper && (
        <div className="download-notice">
          <p>Download initiated for paper ID: {currentPaper}</p>
          <a href={downloadUrl} download>Click here if download didn't start automatically</a>
        </div>
      )}
    </div>
  );
};

export default DataAccess;