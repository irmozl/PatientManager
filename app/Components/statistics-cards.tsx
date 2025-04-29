import { Card } from "@/components/ui/card";
import { FaUsers, FaCalendarAlt, FaStethoscope } from "react-icons/fa";
import { useMemo } from "react";
import usePatientDataStore from "@/app/Hooks/usePatientDataStore";

interface StatisticCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

function SingleStatisticCard({ title, value, icon }: StatisticCardProps) {
  return (
    <Card className="flex flex-row items-center gap-5 p-4 shadow-none border-none md:mt-9 mt-5">
      <div className="rounded-md size-12 bg-primary flex items-center justify-center">
        <div className="text-secondary text-2xl">{icon}</div>
      </div>
      <div>
        <h3 className="font-bold text-2xl">{value}</h3>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </Card>
  );
}

function StatisticCards() {
  const { patients } = usePatientDataStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const safePatients = patients ?? [];


  const { mostCommon, maxCount } = useMemo(() => {
    const diagnosisCount: Record<string, number> = {};
    

    safePatients.forEach((patient) => {
      diagnosisCount[patient.diagnosis] = (diagnosisCount[patient.diagnosis] || 0) + 1;
    });

    let mostCommon = "";
    let maxCount = 0;

    for (const diagnosis in diagnosisCount) {
      if (diagnosisCount[diagnosis] > maxCount) {
        mostCommon = diagnosis;
        maxCount = diagnosisCount[diagnosis];
      }
    }

    return { mostCommon, maxCount };
  }, [safePatients]);

  const upcomingAppointmentsLength = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const count = safePatients.filter((patient) => {
      const appointmentDate = new Date(patient.appointmentDate);
      return appointmentDate >= today && appointmentDate <= nextWeek;
    }).length;

    return count;
  }, [safePatients]);

  const statistics = [
    {
      title: "Total Patients",
      value: safePatients.length,
      icon: <FaUsers />,
    },
    {
      title: "Most Common Diagnosis",
      value: `${mostCommon} (${maxCount})`,
      icon: <FaStethoscope />,
    },
    {
      title: "Upcoming Appointments",
      value: `${upcomingAppointmentsLength}`,
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 px-5 md:mt-5">
      {statistics.map((statistic, index) => (
        <SingleStatisticCard key={index} {...statistic} />
      ))}
    </div>
  );
}

export default StatisticCards;