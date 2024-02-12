/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/int_list.h"

void int_list_dump(int_list_t list) {
  int_list_t tmp = list;

  while (tmp != NULL) {
    printf("%d\n", tmp->value);
    tmp = tmp->next;
  }
}

int int_list_get_elem_at_front(int_list_t list) { return list->value; }

int int_list_get_elem_at_back(int_list_t list) {
  int_list_t tmp = list;

  while (tmp->next != NULL) {
    tmp = tmp->next;
  }
  return (tmp->value);
}

int int_list_get_elem_at_position(int_list_t list, unsigned int position) {
  int_list_t tmp = list;
  unsigned int i = 0;

  while (i < position) {
    tmp = tmp->next;
    if (tmp == NULL)
      return 0;
    i++;
  }
  return (tmp->value);
}
