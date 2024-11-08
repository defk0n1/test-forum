import React, { useRef , useEffect } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); 

// Styled components for timeline items
const DarkTimelineDot = styled(TimelineDot)({
  backgroundColor: '#0B3D91', // Dark blue
  color: '#FFFFFF', // White text
});

const LightConnector = styled(TimelineConnector)({
  backgroundColor: '#00A3E0', // Light blue
  height: 3,
});

const EventTypography = styled(Typography)({
  color: '#62EFFE', // White text for main event titles
  fontWeight: 'bold'
  ,fontFamily: "Overpass"
});

const TimeTypography = styled(Typography)({
  color: '#F9E4BC', // Light gray-blue color for times
  fontFamily: "Overpass"
});

const DescriptionTypography = styled(Typography)({
  color: '#FFFFFF', // Light gray-blue for descriptions
  fontFamily: "Overpass"

});

const Schedule = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineItems = gsap.utils.toArray('.MuiTimelineItem-root');
    
    gsap.set(timelineItems, { opacity: 0 }); // Initial state

    timelineItems.forEach((item) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "-50% 50%", // Animation starts when item reaches 80% of viewport height
          end: "100% 50%",
          toggleActions: "play none none reverse",
          scrub: true,
          markers:true,
        },
        opacity: 1,
        y: 0,
        duration: 5,
        ease: "power3.out",
       
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);







  return (
    
    <Box sx={{ backgroundColor: 'none', borderRadius: 2, position:"absolute" , zIndex:"100" , top:"0" , width:"100vw" }}> {/* Dark blue background */}

      <Timeline position="alternate">
        <div style={{height:"50vh"}}></div>
        
        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">7:30 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="body1">Check-in</EventTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">8:30 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="h6">Opening Ceremony</EventTypography>
            <DescriptionTypography variant="body2">
              Opening word from the Director of SUPCOM and the Minister of Communication Technologies
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">9:00 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="h6">Conference 1</EventTypography>
            <DescriptionTypography variant="body2">
              Topic 1: DevOps - Towards a Seamless DevOps Pipeline
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mrs. Sawsan SELMI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">9:30 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <DescriptionTypography variant="body2">
              Topic 2: MLOps - Catch Up the Train of Technology
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mrs. Dorra ELBOUKARI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">10:00 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <DescriptionTypography variant="body2">
              Topic 3: SecOps - The Role of SecOps in Modern CyberSecurity
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mr. Med Hamdi OUARDI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">10:30 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="body1">Coffee Break</EventTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">11:15 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="h6">Conference 2</EventTypography>
            <DescriptionTypography variant="body2">
              Use Case: FORVIA
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">11:45 am</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <DescriptionTypography variant="body2">
              Round Table: e-Houwiya
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">12:15 pm</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="body1">Lunch and Musical Break</EventTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">2:00 pm</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="h6">Workshops</EventTypography>
            <DescriptionTypography variant="body2">
              Workshop: From Code to Production - An Automated DevOps Pipeline
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mrs. Sawsan SELMI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">2:00 pm</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <DescriptionTypography variant="body2">
              Workshop: Machine Learning on Amazon SageMaker
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mrs. Dorra ELBOUKARI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">2:00 pm</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
            <LightConnector />
          </TimelineSeparator>
          <TimelineContent>
            <DescriptionTypography variant="body2">
              Workshop: Kubernetes Security Automation
            </DescriptionTypography>
            <DescriptionTypography variant="caption">
              Mrs. Karima MECHERGUI
            </DescriptionTypography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimeTypography variant="body2">4:00 pm</TimeTypography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <DarkTimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <EventTypography variant="body1">End of the Forum</EventTypography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <div style={{height:"50vh"}}></div>

    </Box>
    
  );
};

export default Schedule;
