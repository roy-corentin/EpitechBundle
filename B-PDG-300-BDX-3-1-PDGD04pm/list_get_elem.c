/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/list.h"

void list_dump(list_t list, value_displayer_t val_disp) {
  list_t tmp = list;

  while (tmp != NULL) {
    val_disp(tmp->value);
    tmp = tmp->next;
  }
}

void *list_get_elem_at_front(list_t list) { return list->value; }

void *list_get_elem_at_back(list_t list) {
  list_t tmp = list;

  while (tmp->next != NULL)
    tmp = tmp->next;

  return (tmp->value);
}

void *list_get_elem_at_position(list_t list, unsigned int position) {
  list_t tmp = list;
  unsigned int i = 0;

  while (i < position) {
    tmp = tmp->next;
    if (tmp == NULL)
      return NULL;
    i++;
  }
  return (tmp->value);
}
