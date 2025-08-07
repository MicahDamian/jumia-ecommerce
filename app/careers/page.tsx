"use client"

import { useState } from 'react'
import { Briefcase, Users, TrendingUp, Heart, MapPin, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, wellness programs, and mental health support'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Professional development opportunities, training programs, and career advancement'
    },
    {
      icon: Users,
      title: 'Team Culture',
      description: 'Collaborative environment, team building activities, and inclusive workplace'
    },
    {
      icon: DollarSign,
      title: 'Competitive Package',
      description: 'Attractive salary, performance bonuses, and stock options'
    }
  ]

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Technology',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our engineering team to build scalable e-commerce solutions that serve millions of customers across Africa.',
      requirements: ['React/Next.js', 'Node.js', 'AWS', 'Microservices']
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product strategy and development for our marketplace platform, working closely with engineering and design teams.',
      requirements: ['Product Strategy', 'Data Analysis', 'Agile', 'User Research']
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Drive customer acquisition and engagement through digital marketing campaigns across multiple channels.',
      requirements: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics']
    },
    {
      id: 4,
      title: 'Customer Success Manager',
      department: 'Customer Service',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Ensure customer satisfaction and success by providing exceptional support and building strong relationships.',
      requirements: ['Customer Service', 'Communication', 'Problem Solving', 'CRM']
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Analyze business data to provide insights that drive strategic decisions and improve operational efficiency.',
      requirements: ['SQL', 'Python', 'Tableau', 'Statistics']
    },
    {
      id: 6,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create intuitive and engaging user experiences for our web and mobile applications.',
      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    }
  ]

  const departments = ['all', 'Technology', 'Product', 'Marketing', 'Customer Service', 'Analytics', 'Design']

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Be part of Africa's leading e-commerce platform. Help us shape the future of online shopping 
            and make a meaningful impact on millions of lives.
          </p>
          <div className="bg-orange-100 rounded-lg p-8">
            <img
              src="/images/team-meeting.png"
              alt="Jumia Team"
              className="mx-auto rounded-lg"
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Search */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Open Positions</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search jobs by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                  <Briefcase className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.experience}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
          </div>
        )}

        {/* Application Process */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply Online', description: 'Submit your application through our careers portal' },
              { step: '2', title: 'Initial Review', description: 'Our HR team reviews your application and resume' },
              { step: '3', title: 'Interview Process', description: 'Phone/video interviews with hiring managers' },
              { step: '4', title: 'Final Decision', description: 'Reference checks and job offer for successful candidates' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{process.title}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
                <img
                  src="/images/office-space.png"
                  alt="Office Space"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
