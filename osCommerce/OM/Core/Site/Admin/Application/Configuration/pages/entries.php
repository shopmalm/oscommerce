<?php
/*
  osCommerce Online Merchant $osCommerce-SIG$
  Copyright (c) 2010 osCommerce (http://www.oscommerce.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License v2 (1991)
  as published by the Free Software Foundation.
*/

  use osCommerce\OM\Core\OSCOM;
?>

<h1><?php echo $OSCOM_Template->getIcon(32) . osc_link_object(OSCOM::getLink(), $OSCOM_Template->getPageTitle()); ?></h1>

<?php
  if ( $OSCOM_MessageStack->exists() ) {
    echo $OSCOM_MessageStack->get();
  }
?>

<form id="liveSearchForm">
  <input type="text" id="liveSearchField" name="search" class="searchField fieldTitleAsDefault" title="Search.." /><?php echo osc_draw_button(array('type' => 'button', 'params' => 'onclick="osC_DataTable.reset();"', 'title' => 'Reset')); ?>

  <span style="float: right;"><?php echo osc_draw_button(array('href' => OSCOM::getLink(), 'priority' => 'secondary', 'icon' => 'triangle-1-w', 'title' => OSCOM::getDef('button_back'))); ?></span>
</form>

<div style="padding: 20px 5px 5px 5px; height: 16px;">
  <span id="batchTotalPages"></span>
  <span id="batchPageLinks"></span>
</div>

<form name="batch" action="#" method="post">

<table border="0" width="100%" cellspacing="0" cellpadding="2" class="dataTable" id="configurationDataTable">
  <thead>
    <tr>
      <th width="35%;"><?php echo OSCOM::getDef('table_heading_title'); ?></th>
      <th><?php echo OSCOM::getDef('table_heading_value'); ?></th>
      <th width="150"><?php echo OSCOM::getDef('table_heading_action'); ?></th>
      <th align="center" width="20"><?php echo osc_draw_checkbox_field('batchFlag', null, null, 'onclick="flagCheckboxes(this);"'); ?></th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th align="right" colspan="3"><?php echo '<input type="image" src="' . osc_icon_raw('edit.png') . '" title="' . OSCOM::getDef('icon_edit') . '" onclick="document.batch.action=\'' . OSCOM::getLink(null, null, 'BatchSaveEntries&id=' . $_GET['id']) . '\';" />'; ?></th>
      <th align="center" width="20"><?php echo osc_draw_checkbox_field('batchFlag', null, null, 'onclick="flagCheckboxes(this);"'); ?></th>
    </tr>
  </tfoot>
  <tbody>
  </tbody>
</table>

</form>

<div style="padding: 2px; min-height: 16px;">
  <span id="dataTableLegend"><?php echo '<b>' . OSCOM::getDef('table_action_legend') . '</b> ' . osc_icon('edit.png') . '&nbsp;' . OSCOM::getDef('icon_edit'); ?></span>
  <span id="batchPullDownMenu"></span>
</div>

<script type="text/javascript">
  var moduleParamsCookieName = 'oscom_admin_' + pageModule;
  var dataTablePageSetName = 'entries_page';

  var moduleParams = new Object();
  moduleParams[dataTablePageSetName] = 1;
  moduleParams['search'] = '';

  if ( $.cookie(moduleParamsCookieName) != null ) {
    moduleParams = $.secureEvalJSON($.cookie(moduleParamsCookieName));
  }

  var dataTableName = 'configurationDataTable';
  var dataTableDataURL = '<?php echo OSCOM::getRPCLink(null, null, 'GetAllEntries&id=' . $_GET['id']); ?>';

  var configEditLink = '<?php echo OSCOM::getLink(null, null, 'EntrySave&id=' . (int)$_GET['id'] . '&pID=CONFIGID'); ?>';
  var configEditLinkIcon = '<?php echo osc_icon('edit.png'); ?>';

  var osC_DataTable = new osC_DataTable();
  osC_DataTable.load();

  function feedDataTable(data) {
    var rowCounter = 0;

    for ( var r in data.entries ) {
      var record = data.entries[r];

      var newRow = $('#' + dataTableName)[0].tBodies[0].insertRow(rowCounter);
      newRow.id = 'row' + parseInt(record.configuration_id);

      $('#row' + parseInt(record.configuration_id)).hover( function() { $(this).addClass('mouseOver'); }, function() { $(this).removeClass('mouseOver'); }).click(function(event) {
        if (event.target.type !== 'checkbox') {
          $(':checkbox', this).trigger('click');
        }
      }).css('cursor', 'pointer');

      var newCell = newRow.insertCell(0);
      newCell.innerHTML = htmlSpecialChars(record.configuration_title);

      var newCell = newRow.insertCell(1);
      newCell.innerHTML = htmlSpecialChars(record.configuration_value).replace(/([^>]?)\n/g, '$1<br />\n'); // nl2br() in javascript

      newCell = newRow.insertCell(2);
      newCell.innerHTML = '<a href="' + configEditLink.replace('CONFIGID', parseInt(record.configuration_id)) + '">' + configEditLinkIcon + '</a>';
      newCell.align = 'right';

      newCell = newRow.insertCell(3);
      newCell.innerHTML = '<input type="checkbox" name="batch[]" value="' + parseInt(record.configuration_id) + '" id="batch' + parseInt(record.configuration_id) + '" />';
      newCell.align = 'center';

      rowCounter++;
    }
  }
</script>
