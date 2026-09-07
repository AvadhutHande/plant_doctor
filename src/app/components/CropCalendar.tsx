import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Bell, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Field } from '../types';

interface CropCalendarProps {
  onBack: () => void;
  selectedField: Field;
}

// Data for different crops
const CROP_DATA: Record<string, {
  upcoming: any[];
  completed: any[];
  monthly: any[];
  totalDays: number;
  daysElapsed: number;
}> = {
  'Cotton': {
    upcoming: [
      {
        id: 'c1',
        date: 'Feb 8, 2026',
        daysLeft: 1,
        task: 'First Irrigation',
        description: 'Apply light irrigation to cotton field',
        priority: 'high',
        status: 'pending',
        reminderSet: false
      },
      {
        id: 'c2',
        date: 'Feb 10, 2026',
        daysLeft: 3,
        task: 'Weed Management',
        description: 'Remove weeds manually or use approved herbicide',
        priority: 'medium',
        status: 'pending',
        reminderSet: false
      },
      {
        id: 'c3',
        date: 'Feb 15, 2026',
        daysLeft: 8,
        task: 'Gap Filling',
        description: 'Replace missing or weak plants',
        priority: 'medium',
        status: 'pending',
        reminderSet: false
      },
      {
        id: 'c4',
        date: 'Feb 20, 2026',
        daysLeft: 13,
        task: 'Pest Monitoring',
        description: 'Check for aphids and jassids',
        priority: 'high',
        status: 'pending',
        reminderSet: false
      }
    ],
    completed: [
      {
        id: 'cc1',
        date: 'Feb 5, 2026',
        task: 'Seed Treatment',
        description: 'Applied fungicide treatment to seeds',
        status: 'completed'
      },
      {
        id: 'cc2',
        date: 'Feb 3, 2026',
        task: 'Sowing',
        description: 'Sowed cotton seeds at 60×30 cm spacing',
        status: 'completed'
      },
      {
        id: 'cc3',
        date: 'Feb 1, 2026',
        task: 'Basal Fertilizer',
        description: 'Applied DAP and Potash',
        status: 'completed'
      },
      {
        id: 'cc4',
        date: 'Jan 28, 2026',
        task: 'Land Preparation',
        description: 'Completed ploughing and leveling',
        status: 'completed'
      }
    ],
    monthly: [
      { month: 'February', tasks: 5, completed: 2 },
      { month: 'March', tasks: 8, completed: 0 },
      { month: 'April', tasks: 6, completed: 0 },
      { month: 'May', tasks: 7, completed: 0 },
      { month: 'June', tasks: 9, completed: 0 },
      { month: 'July', tasks: 5, completed: 0 }
    ],
    totalDays: 180,
    daysElapsed: 22
  },
  'Wheat': {
    upcoming: [
      {
        id: 'w1',
        date: 'Feb 9, 2026',
        daysLeft: 2,
        task: 'Top Dressing',
        description: 'Apply Urea before irrigation',
        priority: 'high',
        status: 'pending',
        reminderSet: false
      },
      {
        id: 'w2',
        date: 'Feb 14, 2026',
        daysLeft: 7,
        task: 'Irrigation',
        description: 'Critical crown root initiation stage irrigation',
        priority: 'high',
        status: 'pending',
        reminderSet: false
      }
    ],
    completed: [
      {
        id: 'wc1',
        date: 'Jan 20, 2026',
        task: 'Sowing',
        description: 'Sowing completed with seed drill',
        status: 'completed'
      }
    ],
    monthly: [
      { month: 'January', tasks: 2, completed: 2 },
      { month: 'February', tasks: 4, completed: 0 },
      { month: 'March', tasks: 3, completed: 0 },
      { month: 'April', tasks: 1, completed: 0 }
    ],
    totalDays: 120,
    daysElapsed: 45
  },
  'Soybean': {
    upcoming: [
      {
        id: 's1',
        date: 'Feb 12, 2026',
        daysLeft: 5,
        task: 'Spray Insecticide',
        description: 'Prevent leaf miner attack',
        priority: 'medium',
        status: 'pending',
        reminderSet: false
      }
    ],
    completed: [
      {
        id: 'sc1',
        date: 'Jan 15, 2026',
        task: 'Sowing',
        description: 'Completed sowing',
        status: 'completed'
      }
    ],
    monthly: [
      { month: 'January', tasks: 2, completed: 2 },
      { month: 'February', tasks: 3, completed: 0 },
      { month: 'March', tasks: 4, completed: 0 }
    ],
    totalDays: 100,
    daysElapsed: 60
  }
};

export default function CropCalendar({ onBack, selectedField }: CropCalendarProps) {
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [reminders, setReminders] = useState({
    task: true,
    weather: true,
    sms: false
  });

  // Load data when field changes
  useEffect(() => {
    const data = CROP_DATA[selectedField.crop] || CROP_DATA['Cotton'];
    // Deep copy to avoid reference issues when modifying state
    setUpcomingTasks(JSON.parse(JSON.stringify(data.upcoming)));
    setCompletedTasks(JSON.parse(JSON.stringify(data.completed)));
    setMonthlyStats(JSON.parse(JSON.stringify(data.monthly)));
  }, [selectedField.crop]);

  const handleMarkComplete = (taskId: string) => {
    const taskIndex = upcomingTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = upcomingTasks[taskIndex];
    const newUpcoming = [...upcomingTasks];
    newUpcoming.splice(taskIndex, 1);

    const newCompleted = [{
      ...task,
      status: 'completed',
      date: 'Today', // Simply marking as today for this demo
      reminderSet: false // Clear reminder
    }, ...completedTasks];

    setUpcomingTasks(newUpcoming);
    setCompletedTasks(newCompleted);
    toast.success('Task marked as completed!');
  };

  const handleRemindMe = (taskId: string) => {
    const taskIndex = upcomingTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const updatedTasks = [...upcomingTasks];
    updatedTasks[taskIndex].reminderSet = !updatedTasks[taskIndex].reminderSet;
    setUpcomingTasks(updatedTasks);
    
    if (updatedTasks[taskIndex].reminderSet) {
      toast.success(`Reminder set for ${updatedTasks[taskIndex].task}`);
    } else {
      toast.info(`Reminder removed for ${updatedTasks[taskIndex].task}`);
    }
  };

  const cropData = CROP_DATA[selectedField.crop] || CROP_DATA['Cotton'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-teal-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Crop Calendar</h1>
            <p className="text-sm text-teal-100">{selectedField.crop} - Schedule & Reminders</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Overview */}
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-12 h-12" />
              <div className="flex-1">
                <p className="text-sm opacity-90">Crop Season Progress</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl">{cropData.daysElapsed}</p>
                  <p className="text-sm opacity-90">days elapsed</p>
                </div>
                <div className="mt-2 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${(cropData.daysElapsed / cropData.totalDays) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs opacity-75 mt-1">{cropData.totalDays - cropData.daysElapsed} days remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-800">Upcoming Tasks</h2>
            <Badge className="bg-orange-500">{upcomingTasks.length} Pending</Badge>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No upcoming tasks scheduled</p>
            </div>
          ) : (
            upcomingTasks.map((task) => (
              <Card 
                key={task.id}
                className={`shadow-md ${
                  task.priority === 'high' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-orange-500'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-xs text-gray-600">{task.date}</p>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            task.daysLeft <= 2 ? 'border-red-300 text-red-700' : 'border-orange-300 text-orange-700'
                          }`}
                        >
                          {task.daysLeft} day{task.daysLeft > 1 ? 's' : ''} left
                        </Badge>
                      </div>
                      <p className="text-base text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                    <Badge className={
                      task.priority === 'high' ? 'bg-red-500' : 'bg-orange-500'
                    }>
                      {task.priority === 'high' ? 'High' : 'Medium'}
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-teal-600 hover:bg-teal-700 h-9"
                      onClick={() => handleMarkComplete(task.id)}
                    >
                      Mark Complete
                    </Button>
                    <Button 
                      size="sm" 
                      variant={task.reminderSet ? "default" : "outline"}
                      className={`flex-1 h-9 ${task.reminderSet ? "bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200" : ""}`}
                      onClick={() => handleRemindMe(task.id)}
                    >
                      <Bell className={`w-4 h-4 mr-1 ${task.reminderSet ? "fill-current" : ""}`} />
                      {task.reminderSet ? "Reminder Set" : "Remind Me"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Completed Tasks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-800">Completed Tasks</h2>
            <Badge className="bg-green-500">{completedTasks.length} Done</Badge>
          </div>
          
          {completedTasks.map((task) => (
            <Card key={task.id} className="bg-green-50 border-green-200 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-gray-600">{task.date}</p>
                    </div>
                    <p className="text-sm text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Overview */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Task Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {monthlyStats.map((month, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-800">{month.month} 2026</p>
                  <Badge variant="outline">
                    {month.completed}/{month.tasks} tasks
                  </Badge>
                </div>
                <div className="bg-white rounded-full h-2">
                  <div 
                    className="bg-teal-500 h-2 rounded-full" 
                    style={{ width: `${(month.completed / month.tasks) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reminders Settings */}
        <Card className="border-blue-300 bg-blue-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Reminder Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer" onClick={() => setReminders(prev => ({...prev, task: !prev.task}))}>
              <div>
                <p className="text-sm text-gray-800">Task Reminders</p>
                <p className="text-xs text-gray-600">Get notified 1 day before</p>
              </div>
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${reminders.task ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${reminders.task ? 'ml-auto' : ''}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer" onClick={() => setReminders(prev => ({...prev, weather: !prev.weather}))}>
              <div>
                <p className="text-sm text-gray-800">Weather Alerts</p>
                <p className="text-xs text-gray-600">Notify if weather affects schedule</p>
              </div>
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${reminders.weather ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${reminders.weather ? 'ml-auto' : ''}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer" onClick={() => setReminders(prev => ({...prev, sms: !prev.sms}))}>
              <div>
                <p className="text-sm text-gray-800">SMS Notifications</p>
                <p className="text-xs text-gray-600">Receive reminders via SMS</p>
              </div>
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${reminders.sms ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${reminders.sms ? 'ml-auto' : ''}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-amber-300 bg-amber-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-900">
                <p className="mb-1">Calendar Tips</p>
                <ul className="text-xs text-amber-800 space-y-1">
                  <li>• Tasks are automatically scheduled based on crop lifecycle</li>
                  <li>• Adjust dates based on actual weather and field conditions</li>
                  <li>• Enable reminders to never miss important tasks</li>
                  <li>• Mark tasks complete to track your progress</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
