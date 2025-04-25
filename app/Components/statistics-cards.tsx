import { Card } from "@/components/ui/card";
import { FaUsers, FaCalendarAlt, FaStethoscope } from "react-icons/fa";
import { patients } from "../data/patients-data";
import { useMemo } from "react";

interface StatisticCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const getMostCommonDiagnosis = () => {
    const diagnosisCount: Record<string, number> = {};
  
    patients.forEach((patient) => {
      diagnosisCount[patient.diagnosis] = (diagnosisCount[patient.diagnosis] || 0) + 1;
    });
  
    // En çok olanı bul
    let mostCommon = "";
    let maxCount = 0;
  
    for (const diagnosis in diagnosisCount) {
      if (diagnosisCount[diagnosis] > maxCount) {
        mostCommon = diagnosis;
        maxCount = diagnosisCount[diagnosis];
      }
    }
  
    return { mostCommon, maxCount };
  };

  const getUpcomingAppointments = () => {
    const today = new Date(); // Bugünün tarihi
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7); // Bir hafta sonrasını hesapla
  
    // Son bir hafta içinde olan randevuları filtrele
    const upcomingAppointments = patients.filter((patient) => {
      const appointmentDate = new Date(patient.appointmentDate);
      return appointmentDate >= today && appointmentDate <= nextWeek;
    });

    const upcomingAppointmentsLength = upcomingAppointments.length 
  
    return { upcomingAppointmentsLength }; // Kaç tane olduğunu döndür
  };
  

function SingleStatisticCard ({title, value, icon} : StatisticCardProps) {
    return (
        <Card className="flex flex-row items-center gap-5 p-4 shadow-none border-none md:mt-9 mt-5">
            <div className="rounded-md size-12 bg-primary flex items-center justify-center">
                <div className="text-secondary text-2xl ">{icon}</div>
            </div>
            <div>
                <h3 className="font-bold text-2xl">{value}</h3>
                <p className="text-sm text-slate-500">{title}</p>
            </div>
        </Card>
    )
}

function StatisticCards() {
    const { mostCommon, maxCount } = useMemo(getMostCommonDiagnosis, []);
    const { upcomingAppointmentsLength } = useMemo(getUpcomingAppointments, [])

    const statistics = [
        {
            title: "Total Patients",
            value: patients.length,
            icon: <FaUsers />
        },
        {
            title: "Most Common Diagnosis",
            value: `${mostCommon} (${maxCount})`,
            icon: <FaStethoscope />
        },
        {
            title: "Upcoming Appointments",
            value: `${upcomingAppointmentsLength}`,
            icon: <FaCalendarAlt />
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 px-5 md:mt-5">
            {statistics.map((statistic, index) => (
                <SingleStatisticCard key={index} {...statistic} />
            ))}
        </div>
    )
}

    export default StatisticCards;