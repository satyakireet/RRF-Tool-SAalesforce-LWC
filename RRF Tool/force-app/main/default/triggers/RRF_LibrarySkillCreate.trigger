trigger RRF_LibrarySkillCreate on RRF__c (after insert) {
    List<Library_Skill__c> librarySkillList=new List<Library_Skill__c>();
    for (RRF__c rrf: Trigger.new) {
        if (Trigger.isInsert && Trigger.isAfter) {
        	Library_Skill__c librarySkill1=new Library_Skill__c();
            Library_Skill__c librarySkill2=new Library_Skill__c();
            Library_Skill__c librarySkill3=new Library_Skill__c();
            
            librarySkill1.RRF__c=rrf.Id;
            librarySkill1.Name='Compulsory Skills';
            
            librarySkill2.RRF__c=rrf.Id;
            librarySkill2.Name='Additional Skills';
            
            librarySkill3.RRF__c=rrf.Id;
            librarySkill3.Name='Certification';
            
            librarySkillList.add(librarySkill1);
            librarySkillList.add(librarySkill2);
            librarySkillList.add(librarySkill3);
        
        }
    }
    insert librarySkillList;
}