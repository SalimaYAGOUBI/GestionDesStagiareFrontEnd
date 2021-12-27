export class UserSettings {
    static settings = {
      mode: 'external',
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
      },
      edit: {
         editButtonContent: '<i class="nb-compose"></i>',
        } ,

      delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
         } ,
         pager: {
          display: true,
          perPage: 10,
        },
      noDataMessage: 'Aucune données',
      actions: {
        edit: true ,
        delete: true,
        custom: [],
        position: 'right',
      },
      columns: {
        nomUser: {
          title: 'Nom',
          type: 'string',
        },
        prenomUser: {
          title: 'Prenom',
          type: 'string',
        },
        emailUser: {
          title: 'Email',
          type: 'string',
        },
        'profile.role': {
          title: 'Profile',
          type: 'string',
          valuePrepareFunction: (cell, row) => { return row.profile.role }
        },
      },
    };
  }
