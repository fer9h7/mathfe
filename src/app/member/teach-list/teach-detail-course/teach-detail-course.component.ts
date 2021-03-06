import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../../models/house';
import { Chart } from 'chart.js';
import { Skill } from '../../../models/skill';
declare var jQuery: any;
declare var $: any;
import { TrackService } from '../../../services/track.service';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'ag-teach-detail-course',
  templateUrl: './teach-detail-course.component.html',
  styleUrls: ['./teach-detail-course.component.css']
})
export class TeachDetailCourseComponent implements OnInit {

  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Input() selectedTeach: any;
  @Input() user: any;
  chartdata: any;
  addTrackOn: boolean = false;
  editTrackOn: boolean = false;
  deleteTrackOn: boolean = false;
  selectedTrackEdit: any;
  delete_Track: any;
  addSkillOn: boolean = false;
  editSkillOn: boolean = false;
  deleteSkillOn: boolean = false;
  selectedSkillEdit: any;
  delete_skill: any;
  delete_skill_track: any;
  fields: any;
  levels: any;
  statuses: any;
  selectedStudent: any;
  constructor(private trackService: TrackService, private skillService: SkillService) {

  }

  ngOnInit() {
  }
  // unSelect(house: House) {
  //   this.selectedEvent.emit(null);
  // }

  onVideo(skill: Skill) {
    this.selectedVideo.emit(skill);
  }

  createTrack() {
    this.addTrackOn = this.addTrackOn ? false : true;
  }

  editSelectedTrack(track) {
    this.editTrackOn = true;
    this.selectedTrackEdit = track;
  }

  deleteSelectedTrack(track) {
    this.delete_Track = track;
    this.deleteTrackOn = true;
  }
  createSkill() {
    this.addSkillOn = this.addSkillOn ? false : true;
  }

  editSelectedSkill(skill) {
    this.editSkillOn = true;
    this.selectedSkillEdit = skill;
  }

  deleteSelectedSkill(skill, track) {
    this.delete_skill_track = track;
    this.delete_skill = skill;
    this.deleteSkillOn = true;
  }
  getTargetClass(skill, house) {
    if (skill) {
      if (skill.user) {
        if (parseFloat(skill.user.maxile_level) < ((house.underperform * house.end_framework) / 100)) {
          return "btn-delete"; //red (failed)
        } else if (parseFloat(skill.user.maxile_level) > ((house.overperform * house.end_framework) / 100)) {
          return "btn-success"; //green icon (exceed target)
        } else {
          return "btn-warning"  //yellow (on target)
        }
      }
    }
    /**
     * if user.maxile_level < house.underperform/100house.end_framework
    
    , then underperform, if user.maxile_level > house.overperform/100 house.end_framework then overperform. Otherwise, on target.
     * 
     */
  }
}
