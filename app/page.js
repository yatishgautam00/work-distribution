import EmployeeLogin from './components/EmployeeLogin';
import EmployerLogin from './components/EmployerLogin';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl mb-8">Welcome to Our Application</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeeLogin />
        <EmployerLogin />
      </div>
    </div>
  );
}
