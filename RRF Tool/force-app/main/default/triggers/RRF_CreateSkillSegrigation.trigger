trigger RRF_CreateSkillSegrigation on RRF_Segment__c (after insert) {
list<Segment_Skill_Segregation__c> sksList=new list<Segment_Skill_Segregation__c>();
        for (RRF_Segment__c rrfSegment: Trigger.new) {
            if (Trigger.isAfter && Trigger.isInsert) {
                list<Skills_Junction__c> sjsList= RRF_Controller.getAllSkillJunctionByRRFId(rrfSegment.RRF__c);
                for(Skills_Junction__c sj:sjsList){
                    Segment_Skill_Segregation__c sks=new Segment_Skill_Segregation__c();
                    sks.Name=rrfSegment.Name+'-'+sj.Name;
                    sks.RRF_Segment__c=rrfSegment.Id;
                    sks.Skills_Junction__c=sj.Id;
                    sksList.add(sks);
                }
            }
        }
      insert sksList;
}