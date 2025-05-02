import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle, Star, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Faculty {
  id: string;
  name: string;
  organization: string;
  rating: number;
  subjects: string[];
  experience: number;
  difficulty: 'high' | 'medium' | 'low';
}

const SelectFaculty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data loading
  useEffect(() => {
    // Simulate API call to fetch faculty list
    const fetchFaculties = async () => {
      setIsLoading(true);
      
      try {
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockFaculties: Faculty[] = [
          {
            id: '1',
            name: 'Dr. Ramesh Sharma',
            organization: 'IIT Mumbai',
            rating: 4.8,
            subjects: ['Database Management', 'Data Structures'],
            experience: 15,
            difficulty: 'high',
          },
          {
            id: '2',
            name: 'Prof. Sunita Patel',
            organization: 'NIT Delhi',
            rating: 4.5,
            subjects: ['Computer Networks', 'Operating Systems'],
            experience: 12,
            difficulty: 'high',
          },
          {
            id: '3',
            name: 'Dr. Anand Kumar',
            organization: 'Delhi University',
            rating: 4.2,
            subjects: ['Software Engineering', 'Web Development'],
            experience: 10,
            difficulty: 'medium',
          },
          {
            id: '4',
            name: 'Prof. Meera Singh',
            organization: 'Mumbai University',
            rating: 4.0,
            subjects: ['Artificial Intelligence', 'Machine Learning'],
            experience: 8,
            difficulty: 'medium',
          },
          {
            id: '5',
            name: 'Dr. Rajesh Verma',
            organization: 'K.J. Somaiya College',
            rating: 4.1,
            subjects: ['Python Programming', 'Data Science'],
            experience: 7,
            difficulty: 'low',
          },
          {
            id: '6',
            name: 'Prof. Priya Desai',
            organization: 'VJTI College',
            rating: 3.9,
            subjects: ['Computer Graphics', 'Multimedia Systems'],
            experience: 6,
            difficulty: 'low',
          },
        ];
        
        // Sort by rating (highest first)
        const sortedFaculties = mockFaculties.sort((a, b) => b.rating - a.rating);
        
        setFaculties(sortedFaculties);
        setFilteredFaculties(sortedFaculties);
      } catch (error) {
        toast.error('Failed to load faculty list. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFaculties();
  }, []);
  
  // Handle filtering
  useEffect(() => {
    let result = [...faculties];
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(faculty => faculty.difficulty === difficultyFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        faculty =>
          faculty.name.toLowerCase().includes(query) ||
          faculty.organization.toLowerCase().includes(query) ||
          faculty.subjects.some(subject => subject.toLowerCase().includes(query))
      );
    }
    
    setFilteredFaculties(result);
  }, [difficultyFilter, searchQuery, faculties]);
  
  const handleConfirm = async () => {
    if (!selectedFaculty) {
      toast.error('Please select a faculty member');
      return;
    }
    
    setIsConfirming(true);
    
    try {
      // Simulate API call to assign faculty
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Faculty selected successfully!');
      navigate('/paper-getter/paper-status');
    } catch (error) {
      toast.error('Failed to select faculty. Please try again.');
      setIsConfirming(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Select Faculty</h1>
        <p className="mt-2 text-gray-600">
          Choose a subject expert to create your question paper.
          Faculty members are sorted by their ratings.
        </p>
      </div>
      
      {/* Filters */}
      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="search" className="form-label flex items-center">
              <Search size={18} className="mr-2 text-gray-500" />
              Search Faculty
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name, organization or subject"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="difficulty" className="form-label flex items-center">
              <Filter size={18} className="mr-2 text-gray-500" />
              Filter by Difficulty
            </label>
            <select
              id="difficulty"
              className="form-input"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="high">High - IIT/NIT Professors</option>
              <option value="medium">Medium - Central/State University Professors</option>
              <option value="low">Low - Autonomous/Affiliated College Professors</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Faculty List */}
      <div className="card">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Available Faculty Members</h2>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : filteredFaculties.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No faculty members found matching your criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFaculties.map((faculty) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer p-6 transition-colors ${
                  selectedFaculty === faculty.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedFaculty(faculty.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{faculty.name}</h3>
                    <p className="mt-1 text-gray-500">{faculty.organization}</p>
                    <div className="mt-2 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(faculty.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">{faculty.rating.toFixed(1)}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">Expertise: </span>
                      <span className="text-sm text-gray-600">{faculty.subjects.join(', ')}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-medium text-gray-700">Experience: </span>
                      <span className="text-sm text-gray-600">{faculty.experience} years</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-medium text-gray-700">Difficulty: </span>
                      <span className="text-sm text-gray-600">
                        {faculty.difficulty === 'high' && 'High (IIT/NIT)'}
                        {faculty.difficulty === 'medium' && 'Medium (Central/State University)'}
                        {faculty.difficulty === 'low' && 'Low (Autonomous/Affiliated College)'}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200">
                    {selectedFaculty === faculty.id && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate('/paper-getter/request-paper')}
        >
          Back
        </Button>
        <Button
          isLoading={isConfirming}
          disabled={!selectedFaculty}
          onClick={handleConfirm}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

export default SelectFaculty;