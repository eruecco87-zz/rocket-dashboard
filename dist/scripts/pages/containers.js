$(function(){"use strict";!function(a){rocketDashboard.Pages.Containers={init:function(){a(".refresh-trigger").on("click",function(){rocketDashboard.Utils.addAjaxLoader(a(this).parents(".box, .widget, .tile").find(".box-content, .widget-content, .tile-content"))}),a(".sortable-containment-box .sortable").sortable({connectWith:".sortable-containment-box .sortable",cursor:"move",containment:".sortable-containment-box",placeholder:"ui-state-highlight"}),a(".sortable-containment-tile .sortable").sortable({connectWith:".sortable-containment-tile .sortable",cursor:"move",containment:".sortable-containment-tile",placeholder:"ui-state-highlight"})}()}}(jQuery,window)});